/*

  Esercizio: correggere `_.get`

*/

import * as _ from 'lodash'

// e1 è di tipo `any` ma dovrebbe essere di tipo `number`
const e1 = _.get({ a: { b: 1 } }, ['a', 'b'])
