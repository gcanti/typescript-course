// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function remove<O, K extends keyof O>(
  o: O,
  k: K
): Pick<O, Exclude<keyof O, K>>

// ------------------------------------------------------
// tests
// ------------------------------------------------------

declare const x: { a: string; b: number; c: boolean }

// $ExpectError
remove(x, 'd')
// $ExpectType Pick<{ a: string; b: number; c: boolean; }, "b" | "c">
export const result = remove(x, 'a')
