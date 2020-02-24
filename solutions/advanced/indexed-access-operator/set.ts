// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function set<O, K extends keyof O>(k: K, v: O[K], o: O): O

// ------------------------------------------------------
// tests
// ------------------------------------------------------

declare const x: { a: string; b: number; c: boolean }

// $ExpectError
set('d', 1, x)
// $ExpectType { a: string; b: number; c: boolean; }
set('b', 1, x)
