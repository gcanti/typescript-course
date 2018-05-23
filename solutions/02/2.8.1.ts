/*

  Esercizio: ricavare un record di predicati da un record

*/

interface X {
  a: string
  b: number
  c: boolean
}

type Predicate<A> = (a: A) => boolean

type AsPredicates<O> = { [K in keyof O]: Predicate<O[K]> }

// tests

import { AssertEquals } from '../equals'

type S1 = AssertEquals<
  AsPredicates<X>,
  {
    a: (x: string) => boolean
    b: (x: number) => boolean
    c: (x: boolean) => boolean
  },
  'T'
>
