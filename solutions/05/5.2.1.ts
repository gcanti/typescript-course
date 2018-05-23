/*

  Esercizio: rappresentare il tipo `JSON`

*/

export interface JSONArray extends Array<JSON> {}
export type JSONObject = { [key: string]: JSON }
export type JSON = null | string | number | boolean | JSONArray | JSONObject

// tests

// $ExpectError .
const t1: JSON = { a: [1, 2, { b: undefined }] }
const t2: JSON = { a: [1, 2, { b: null }] }
