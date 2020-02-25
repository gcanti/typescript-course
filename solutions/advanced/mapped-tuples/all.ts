// ------------------------------------------------------
// source
// ------------------------------------------------------

type Awaited<T> = T extends Promise<infer U> ? U : T

export declare function all<T extends Array<Promise<unknown>>>(
  ...ps: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }>

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectType Promise<[number, string]>
all(Promise.resolve(1), Promise.resolve('foo'))
