// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function getter(k: string): Function

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectError
getter('name')({})
// $ExpectType string
getter('name')({ name: 'Giulio' })
// $ExpectType number
getter('age')({ age: 44 })
