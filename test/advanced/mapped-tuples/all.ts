// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function all(...ps: Array<Promise<unknown>>): Promise<unknown>

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectType Promise<[number, string]>
all(Promise.resolve(1), Promise.resolve('foo'))
