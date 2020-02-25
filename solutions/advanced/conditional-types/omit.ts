// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function omit<O extends object, KS extends Array<keyof O>>(
  o: O,
  keys: KS
): Pick<O, Exclude<keyof O, KS[number]>>

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
