// ------------------------------------------------------
// source
// ------------------------------------------------------

export type Key = 'foo'

export type Singleton = { [K in Key]: number }

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectType number
export type Test = Singleton['foo']