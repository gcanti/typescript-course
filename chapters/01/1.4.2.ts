export const head = (xs: Array<number>): number => {
  return xs[0]
}

const x: number = head([]) // no error

import * as fs from 'fs'

// should return `string`
fs.readFileSync('', 'utf8')
// throws "no such file or directory" instead
