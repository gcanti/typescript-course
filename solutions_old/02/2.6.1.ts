/*

  Esercizio: rendere immutabile la seguente interfaccia

*/

export interface Person {
  name: {
    first: string
    last: string
  }
  interests: Array<string>
}

interface ReadonlyPerson {
  readonly name: {
    readonly first: string
    readonly last: string
  }
  readonly interests: ReadonlyArray<string>
}

// tests

declare const person: ReadonlyPerson

// $ExpectError .
person.name = { first: 'foo', last: 'bar' }
// $ExpectError .
person.name.last = 'foo'
// $ExpectError .
person.interests = []
// $ExpectError .
person.interests[0] = 'bar'
