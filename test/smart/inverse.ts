// ------------------------------------------------------
// source
// ------------------------------------------------------

export declare function inverse(x: number): number

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectError
inverse(0)

// scrivere un type-level test che verifica il funzionamento di `inverse` per x = 2
