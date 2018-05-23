/*

  Esercizio: rappresentare il tipo `JSON`

*/

export type JSON = never

// tests

// $ExpectError .
const e1: JSON = { a: [1, 2, { b: undefined }] }
const s1: JSON = { a: [1, 2, { b: null }] }
