// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function get(key: string, obj: unknown): unknown

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
