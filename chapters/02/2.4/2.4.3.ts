import { parse } from '../../01/1.7.3'

const payload = `{"bar":"foo"}`
const x = parse(payload)

/*
if (typeof x === 'object') {
  // x ha tipo object | null
  if (x !== null) {
    // x ha tipo object
    const bar = (x as { [key: string]: unknown }).bar
    if (typeof bar === 'string') {
      // bar ha tipo string
      console.log(bar.trim())
    }
  }
}
*/

const isObject = (x: unknown): x is object =>
  typeof x === 'object' && x !== null

const isDictionary = (
  x: unknown
): x is { [key: string]: unknown } => isObject(x)

const isString = (x: unknown): x is string =>
  typeof x === 'string'

if (isDictionary(x)) {
  if (isString(x.bar)) {
    console.log(x.bar.trim())
  }
}
