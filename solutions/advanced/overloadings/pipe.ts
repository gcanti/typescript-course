// ------------------------------------------------------
// source
// ------------------------------------------------------

declare function pipe<A, B, C, D>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (a: A) => D
declare function pipe<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C

// ------------------------------------------------------
// tests
// ------------------------------------------------------

declare function len(s: string): number
declare function double(n: number): number
declare function gt2(n: number): boolean

pipe(len, double) // $ExpectType (a: string) => number
pipe(len, double, gt2) // $ExpectType (a: string) => boolean
