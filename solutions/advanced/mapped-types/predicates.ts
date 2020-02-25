// ------------------------------------------------------
// source
// ------------------------------------------------------

export interface X {
  a: string
  b: number
  c: boolean
}

export type Predicates = { [K in keyof X]: (_: X[K]) => boolean }

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectType (_: string) => boolean
export type a = Predicates['a']
// $ExpectType (_: number) => boolean
export type b = Predicates['b']
// $ExpectType (_: boolean) => boolean
export type c = Predicates['c']
