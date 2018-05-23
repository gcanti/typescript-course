/*

  Esercizio: correggere `_.get`

*/

import * as _ from 'lodash'

const e1 = _.get({ a: { b: 1 } }, ['a', 'b'])

// declare module 'lodash' {
//   interface LoDashStatic {
//     get<O extends object, K1 extends keyof O, K2 extends keyof O[K1]>(
//       o: O,
//       keys: [K1, K2]
//     ): O[K1][K2]
//   }
// }
