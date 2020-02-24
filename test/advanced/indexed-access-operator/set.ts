// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function set(k: string, v: unknown, o: unknown): unknown

// ------------------------------------------------------
// tests
// ------------------------------------------------------

declare const x: { a: string; b: number; c: boolean }

// $ExpectError
set('d', 1, x)
// $ExpectType { a: string; b: number; c: boolean }
set('b', 1, x)
