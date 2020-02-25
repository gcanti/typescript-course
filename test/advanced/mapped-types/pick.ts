// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function pick(ks: Array<string>, o: object): unknown

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
