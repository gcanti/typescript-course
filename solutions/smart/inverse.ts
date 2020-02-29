// ------------------------------------------------------
// source
// ------------------------------------------------------

export interface NonZeroBrand {
  readonly NonZero: unique symbol
}

export type NonZero = number & NonZeroBrand

export function isNonZero(n: number): n is NonZero {
  return n !== 0
}

export function nonZero(x: number): NonZero | undefined {
  return isNonZero(x) ? x : undefined
}

export function inverse(x: NonZero): number {
  return 1 / x
}

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectError
inverse(0)

// scrivere un type-level test che verifica il funzionamento di `inverse` per x = 2
const two = nonZero(2)
if (two) {
  // $ExpectType number
  inverse(two)
}
