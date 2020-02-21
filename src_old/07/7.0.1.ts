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

function fsm(s: State, e: Event): Promise<State> {
  return Promise.resolve(s)
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

// const initialState: State = new NoItems()

/*
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
*/
