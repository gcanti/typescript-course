// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function getName<T extends { name: unknown }>(t: T): T['name']

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectType string
getName({ name: 'Giulio' })

// $ExpectType string[]
getName({ name: ['Giulio', 'Canti'] })
