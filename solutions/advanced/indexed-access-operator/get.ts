// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function get<O, K extends keyof O>(k: K, o: O): O[K]

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectError
get('a', 1)
// $ExpectError
get('a', {})
// $ExpectError
get('a', { b: 1 })
// $ExpectType number
get('a', { a: 1, b: true })
