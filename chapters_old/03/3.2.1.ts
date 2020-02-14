// lodash@4.17.10
// @types/lodash@4.14.109
import * as _ from 'lodash'

const f = (a: number, b: string): number => a + b.trim().length

/*

  La funzione `flip` è definita con questa tipizzazione

  flip<T extends (...args: any[]) => any>(func: T): T;

*/
const g = _.flip(f)

g(1, 'a') // esplode a runtime: b.trim is not a function

// Soluzione: module augmentation / declaration merging

// declare module 'lodash' {
//   interface LoDashStatic {
//     flip<A, B, C>(f: (a: A, b: B) => C): (b: B, a: A) => C
//     flip<A, B>(f: (a: A) => B): (a: A) => B
//     flip<A>(f: () => A): () => A
//   }
// }
