export interface Item {
  name: string
  price: number
}

export type Card = string

//
// States
//

export type State = never

//
// Events
//

export type Event = never

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

function fsm(s: State, e: Event): Promise<State> {
  return Promise.resolve(s)
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

// runFSM(withLoggin(fsm))(new NoItems())([
//   new Select({ name: 'potatoes', price: 23.95 }),
//   new Select({ name: 'fish', price: 168.5 }),
//   new Checkout(),
//   new SelectCard('0000-0000-0000-0000'),
//   new Confirm(),
//   new PlaceOrder()
// ])
