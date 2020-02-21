// ------------------------------------------------------
// source
// ------------------------------------------------------

export interface Person {
  name: {
    first: string
    last: string
  }
  interests: Array<string>
}

type ReadonlyPerson = Person

// ------------------------------------------------------
// tests
// ------------------------------------------------------

declare const person: ReadonlyPerson

// $ExpectError .
person.name = { first: 'foo', last: 'bar' }
// $ExpectError .
person.name.last = 'foo'
// $ExpectError .
person.interests = []
// $ExpectError .
person.interests[0] = 'bar'
