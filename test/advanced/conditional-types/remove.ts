// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function remove(o: object, k: string): unknown

// ------------------------------------------------------
// tests
// ------------------------------------------------------

declare const x: { a: string; b: number; c: boolean }

// $ExpectError
remove(x, 'd')
// $ExpectType Pick<{ a: string; b: number; c: boolean; }, "b" | "c">
export const result = remove(x, 'a')
