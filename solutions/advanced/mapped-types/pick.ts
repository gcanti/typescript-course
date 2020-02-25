// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function pick<O, K extends keyof O>(
  ks: Array<K>,
  o: O
): Pick<O, K>

// ------------------------------------------------------
// tests
// ------------------------------------------------------

declare const x: { a: string; b: number; c: boolean }

// $ExpectError
pick('a', x)
// $ExpectError
pick(['d'], x)

export const result = pick(['a', 'b'], x)

// $ExpectType string
export const a = result.a
// $ExpectType number
export const b = result.b
