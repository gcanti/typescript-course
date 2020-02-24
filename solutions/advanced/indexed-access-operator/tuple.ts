// ------------------------------------------------------
// source
// ------------------------------------------------------

export type Tuple = [number, string, boolean]

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectType number
export type Fst = Tuple[0]
// $ExpectType string
export type Snd = Tuple[1]
