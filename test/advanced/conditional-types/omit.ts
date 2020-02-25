// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function omit(o: object, keys: Array<string>): unknown

// ------------------------------------------------------
// tests
// ------------------------------------------------------

declare const x: { a: string; b: number; c: boolean }

// $ExpectError
omit(x, 1)
// $ExpectError
omit(x, ['a', 'unknown'])
// $ExpectType Pick<{ a: string; b: number; c: boolean; }, "c">
omit(x, ['a', 'b'])
