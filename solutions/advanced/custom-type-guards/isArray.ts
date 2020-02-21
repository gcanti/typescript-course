// ------------------------------------------------------
// source
// ------------------------------------------------------

export const isArray: (u: unknown) => u is Array<unknown> = Array.isArray

// ------------------------------------------------------
// tests
// ------------------------------------------------------

declare const u: unknown

if (isArray(u)) {
  const us = u // $ExpectType unknown[]
  console.log(us)
}
