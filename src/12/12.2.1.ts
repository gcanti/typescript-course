/*

  Esercizio: Definire `Integer` e `PositiveInteger`

*/

export interface Newtype<M, A> {
  readonly M: M
  readonly A: A
}

export interface Positive
  extends Newtype<
      {
        readonly Positive: unique symbol
      },
      number
    > {}

interface Integer {}

interface PositiveInteger {}

declare function f(x: Integer): void
declare function g(x: Positive): void
declare function h(x: PositiveInteger): void

declare const i: Integer
declare const pi: PositiveInteger

f(i)
f(pi)
// $ExpectError .
g(i)
g(pi)
// $ExpectError .
h(i)
h(pi)
