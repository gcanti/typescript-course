import { NonEmptyArray } from '../NonEmptyArray'

export interface Item {
  name: string
  price: number
}

export type Card = string

//
// States
//

export class NoItems {
  type: 'NoItems' = 'NoItems'
}
export class HasItems {
  type: 'HasItems' = 'HasItems'
  constructor(readonly items: NonEmptyArray<Item>) {}
}
export class NoCard {
  type: 'NoCard' = 'NoCard'
  constructor(readonly items: NonEmptyArray<Item>) {}
}
export class CardSelected {
  type: 'CardSelected' = 'CardSelected'
  constructor(readonly items: NonEmptyArray<Item>, readonly card: Card) {}
}
export class CardConfirmed {
  type: 'CardConfirmed' = 'CardConfirmed'
  constructor(readonly items: NonEmptyArray<Item>, readonly card: Card) {}
}
export class OrderPlaced {
  type: 'OrderPlaced' = 'OrderPlaced'
}
export type State =
  | NoItems
  | HasItems
  | NoCard
  | CardSelected
  | CardConfirmed
  | OrderPlaced

//
// Events
//

export class Select {
  type: 'Select' = 'Select'
  constructor(readonly item: Item) {}
}

export class Checkout {
  type: 'Checkout' = 'Checkout'
}

export class SelectCard {
  type: 'SelectCard' = 'SelectCard'
  constructor(readonly card: Card) {}
}

export class Confirm {
  type: 'Confirm' = 'Confirm'
}

export class PlaceOrder {
  type: 'PlaceOrder' = 'PlaceOrder'
}

export class Cancel {
  type: 'Cancel' = 'Cancel'
}

export type Event =
  | Select
  | Checkout
  | SelectCard
  | Confirm
  | PlaceOrder
  | Cancel

//
// FSM
//

type FSM<S, E> = (s: S, e: E) => Promise<S>

type Amount = number

const delay = <A>(millis: number, a: A, message: string): Promise<A> =>
  new Promise(res => {
    setTimeout(() => {
      console.log(message)
      res(a)
    }, millis)
  })

const PaymentProvider = {
  chargeCard: (card: Card, amount: Amount) =>
    delay(2000, undefined, `charging card ${card}: ${amount}`)
}

const ItemProvider = {
  calculatePrice: (items: Array<Item>) =>
    delay(2000, 100, `calculating price for ${items.length} items`)
}

const handleNoItems = (s: NoItems, e: Event): Promise<State> => {
  switch (e.type) {
    case 'Select':
      return Promise.resolve(new HasItems(new NonEmptyArray(e.item, [])))
    case 'Checkout':
    case 'SelectCard':
    case 'Confirm':
    case 'PlaceOrder':
    case 'Cancel':
      return Promise.resolve(s)
  }
}

const handleHasItems = (s: HasItems, e: Event): Promise<State> => {
  switch (e.type) {
    case 'Select':
      return Promise.resolve(
        new HasItems(new NonEmptyArray(e.item, s.items.toArray()))
      )
    case 'Checkout':
      return Promise.resolve(new NoCard(s.items))
    case 'SelectCard':
    case 'Confirm':
    case 'PlaceOrder':
    case 'Cancel':
      return Promise.resolve(s)
  }
}

const handleNoCard = (s: NoCard, e: Event): Promise<State> => {
  switch (e.type) {
    case 'SelectCard':
      return Promise.resolve(new CardSelected(s.items, e.card))
    case 'Cancel':
      return Promise.resolve(new HasItems(s.items))
    case 'Select':
    case 'Checkout':
    case 'Confirm':
    case 'PlaceOrder':
      return Promise.resolve(s)
  }
}

const handleCardSelected = (s: CardSelected, e: Event): Promise<State> => {
  switch (e.type) {
    case 'Confirm':
      return Promise.resolve(new CardConfirmed(s.items, s.card))
    case 'Cancel':
      return Promise.resolve(new HasItems(s.items))
    case 'Select':
    case 'Checkout':
    case 'SelectCard':
    case 'PlaceOrder':
      return Promise.resolve(s)
  }
}

const handleCardConfirmed = (s: CardConfirmed, e: Event): Promise<State> => {
  switch (e.type) {
    case 'PlaceOrder':
      return ItemProvider.calculatePrice(s.items.toArray())
        .then(amount => PaymentProvider.chargeCard(s.card, amount))
        .then(() => new OrderPlaced())
    case 'Cancel':
      return Promise.resolve(new HasItems(s.items))
    case 'Select':
    case 'Checkout':
    case 'SelectCard':
    case 'Confirm':
      return Promise.resolve(s)
  }
}

const handleOrderPlaced = (s: OrderPlaced, e: Event): Promise<State> => {
  switch (e.type) {
    case 'Select':
    case 'Checkout':
    case 'SelectCard':
    case 'Confirm':
    case 'PlaceOrder':
    case 'Cancel':
      return Promise.resolve(s)
  }
}

function fsm(s: State, e: Event): Promise<State> {
  switch (s.type) {
    case 'NoItems':
      return handleNoItems(s, e)
    case 'HasItems':
      return handleHasItems(s, e)
    case 'NoCard':
      return handleNoCard(s, e)
    case 'CardSelected':
      return handleCardSelected(s, e)
    case 'CardConfirmed':
      return handleCardConfirmed(s, e)
    case 'OrderPlaced':
      return handleOrderPlaced(s, e)
  }
}

const runFSM = <S, E>(fsm: FSM<S, E>) => (s: S) => (fe: Array<E>): Promise<S> =>
  fe.reduce((ps, e) => ps.then(s => fsm(s, e)), Promise.resolve(s))

const show = <A>(x: A): string => {
  const { type, ...rest } = x as any
  // return `(${type} ${JSON.stringify(rest)})`
  return `(${type})`
}

const withLoggin = <S, E>(fsm: FSM<S, E>): FSM<S, E> => (s, e) =>
  fsm(s, e).then(s2 => {
    console.log(`- ${show(s)} × ${show(e)} → ${show(s2)}`)
    return s2
  })

runFSM(withLoggin(fsm))(new NoItems())([
  new Select({ name: 'potatoes', price: 23.95 }),
  new Select({ name: 'fish', price: 168.5 }),
  new Checkout(),
  new SelectCard('0000-0000-0000-0000'),
  new Confirm(),
  new PlaceOrder()
])
/*
- (NoItems) × (Select) → (HasItems)
- (HasItems) × (Select) → (HasItems)
- (HasItems) × (Checkout) → (NoCard)
- (NoCard) × (SelectCard) → (CardSelected)
- (CardSelected) × (Confirm) → (CardConfirmed)
calculating price for 2 items
charging card 0000-0000-0000-0000: 100
- (CardConfirmed) × (PlaceOrder) → (OrderPlaced)
*/
