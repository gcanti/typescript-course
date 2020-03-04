// chapters/definition-file/flip.ts

/*
  lodash@4.17.15
  @types/lodash@4.14.149
 */
import * as _ from 'lodash'

const f = (a: number, b: string): number => a + b.trim().length

/*

  La funzione `flip` è definita con questa tipizzazione

  flip<T extends (...args: any[]) => any>(func: T): T;

*/
const g = _.flip(f)

g(1, 'a') // esplode a runtime: b.trim is not a function

// declare module 'lodash' {
//   interface LoDashStatic {
//     flip<A, B, C>(f: (a: A, b: B) => C): (b: B, a: A) => C
//   }
// }

// // $ExpectError
// g(1, 'a')

/**
 * type-safe `flip`
 */
export const flip: <A, B, C>(
  f: (a: A, b: B) => C
) => (b: B, a: A) => C = _.flip as any
