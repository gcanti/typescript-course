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

class G {
  g(x: number): string
  g(x: string): number
  g(x: string | number): number | string {
    return null as any
  }
}
