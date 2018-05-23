/*

  Esercizio: ricavare il tipo del campo `baz` estraendolo dalla seguente definizione

*/

export interface Foo {
  foo: {
    bar: {
      baz: number
      quux: string
    }
  }
}

type TypeOfBaz = Foo['foo']['bar']['baz']

// tests

import { AssertEquals } from '../equals'

type S1 = AssertEquals<TypeOfBaz, number, 'T'>
