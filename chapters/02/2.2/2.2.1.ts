/*

  Problema:

  - la funzione f deve restituire un numero se l'input è una stringa
  - la funzione f deve restituire una stringa se l'input è un numero

*/
export declare function f(x: string | number): number | string

// x1: string | number
const x1 = f('foo')
// x2: string | number
const x2 = f(1)

declare function g(x: number): string
declare function g(x: string): number
declare function g(x: string | number): number | string

// x3: number
const x3 = g('foo')
// x4: string
const x4 = g(1)

interface H {
  (x: number): string
  (x: string): number
}

/*
Type '(x: string | number) => string | number' is not assignable to type 'H'.
  Type 'string | number' is not assignable to type 'string'.
    Type 'number' is not assignable to type 'string'.
*/
const h1: H = (x: number | string): number | string => x

const h2: H = (x: any): any => x
