// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function isArray(u: unknown): boolean

// ------------------------------------------------------
// tests
// ------------------------------------------------------

declare const u: unknown

if (isArray(u)) {
  const us = u // $ExpectType unknown[]
  console.log(us)
}
