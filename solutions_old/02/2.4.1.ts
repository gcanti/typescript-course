/*

  Esercizio: Definire una versione di `Array.isArray` più type-safe

*/

export const isArray = (x: unknown): x is Array<unknown> =>
  Array.isArray(x)
