// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function getter<F extends string>(
  k: F
): <T extends Record<F, unknown>>(t: T) => T[F]

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectError
getter('name')({})
// $ExpectType string
getter('name')({ name: 'Giulio' })
// $ExpectType number
getter('age')({ age: 44 })
