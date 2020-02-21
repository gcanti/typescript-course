// ------------------------------------------------------
// source
// ------------------------------------------------------

declare function pipe(ab: Array<Function>): Function

// ------------------------------------------------------
// tests
// ------------------------------------------------------

declare function len(s: string): number
declare function double(n: number): number
declare function gt2(n: number): boolean

pipe(len, double) // $ExpectType (a: string) => number
pipe(len, double, gt2) // $ExpectType (a: string) => boolean
