// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function getName(o: object): unknown

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectType string
getName({ name: 'Giulio' })

// $ExpectType string[]
getName({ name: ['Giulio', 'Canti'] })
