import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

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
  constructor(
    readonly items: NonEmptyArray<Item>,
    readonly card: Card
  ) {}
}
export class CardConfirmed {
  type: 'CardConfirmed' = 'CardConfirmed'
  constructor(
    readonly items: NonEmptyArray<Item>,
    readonly card: Card
  ) {}
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
// Faked APIs
//

const delay = <A>(
  millis: number,
  a: A,
  message: string
): Promise<A> =>
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
    delay(
      2000,
      100,
      `calculating price for ${items.length} items`
    )
}

//
// FSM
//

type FSM<S, E> = (s: S, e: E) => Promise<S>

type Amount = number

const handleNoItems = (
  s: NoItems,
  e: Event
): Promise<State> => {
  switch (e.type) {
    case 'Select':
      return Promise.resolve(
        new HasItems(new NonEmptyArray(e.item, []))
      )
    case 'Checkout':
    case 'SelectCard':
    case 'Confirm':
    case 'PlaceOrder':
    case 'Cancel':
      return Promise.resolve(s)
  }
}

const handleHasItems = (
  s: HasItems,
  e: Event
): Promise<State> => {
  switch (e.type) {
    case 'Select':
      return Promise.resolve(
        new HasItems(
          new NonEmptyArray(e.item, s.items.toArray())
        )
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

const handleCardSelected = (
  s: CardSelected,
  e: Event
): Promise<State> => {
  switch (e.type) {
    case 'Confirm':
      return Promise.resolve(
        new CardConfirmed(s.items, s.card)
      )
    case 'Cancel':
      return Promise.resolve(new HasItems(s.items))
    case 'Select':
    case 'Checkout':
    case 'SelectCard':
    case 'PlaceOrder':
      return Promise.resolve(s)
  }
}

const handleCardConfirmed = (
  s: CardConfirmed,
  e: Event
): Promise<State> => {
  switch (e.type) {
    case 'PlaceOrder':
      return ItemProvider.calculatePrice(s.items.toArray())
        .then(amount =>
          PaymentProvider.chargeCard(s.card, amount)
        )
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

const handleOrderPlaced = (
  s: OrderPlaced,
  e: Event
): Promise<State> => {
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

//
// tests
//

import * as assert from 'assert'

const runFSM = <S, E>(fsm: FSM<S, E>) => (
  s: S,
  fe: Array<E>
): Promise<S> =>
  fe.reduce(
    (ps, e) => ps.then(s => fsm(s, e)),
    Promise.resolve(s)
  )

const withLogging = <S>(log: Array<S>) => <E>(
  fsm: FSM<S, E>
): FSM<S, E> => (s, e) =>
  fsm(s, e).then(s2 => {
    log.push(s2)
    return s2
  })

const log: Array<State> = []

const initialState: State = new NoItems()

runFSM(withLogging(log)(fsm))(initialState, [
  new Select({ name: 'potatoes', price: 23.95 }),
  new Select({ name: 'fish', price: 168.5 }),
  new Checkout(),
  new SelectCard('0000-0000-0000-0000'),
  new Confirm(),
  new PlaceOrder()
]).then(() => {
  assert.deepEqual(log, expected)
})

const expected = [
  new HasItems(
    new NonEmptyArray({ name: 'potatoes', price: 23.95 }, [])
  ),
  new HasItems(
    new NonEmptyArray({ name: 'fish', price: 168.5 }, [
      { name: 'potatoes', price: 23.95 }
    ])
  ),
  new NoCard(
    new NonEmptyArray({ name: 'fish', price: 168.5 }, [
      { name: 'potatoes', price: 23.95 }
    ])
  ),
  new CardSelected(
    new NonEmptyArray({ name: 'fish', price: 168.5 }, [
      { name: 'potatoes', price: 23.95 }
    ]),
    '0000-0000-0000-0000'
  ),
  new CardConfirmed(
    new NonEmptyArray({ name: 'fish', price: 168.5 }, [
      { name: 'potatoes', price: 23.95 }
    ]),
    '0000-0000-0000-0000'
  ),
  new OrderPlaced()
]
