// ------------------------------------------------------
// source
// ------------------------------------------------------

export interface X {
  a: string
  b: number
  c: string
}

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectType "a" | "c"
export type Keys = {
  [K in keyof X]: X[K] extends string ? K : never
}[keyof X]
