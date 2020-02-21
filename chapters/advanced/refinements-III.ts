// chapters/advanced/refinements-III.ts

export const parse: (input: string) => unknown = JSON.parse

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

function isString(u: unknown): u is string {
  return typeof u === 'string'
}

function isUnknownRecord(u: unknown): u is { [key: string]: unknown } {
  return Object.prototype.toString.call(u) === '[object Object]'
}

if (isUnknownRecord(x)) {
  // qui x è di tipo { [key: string]: unknown }
  if (isString(x.bar)) {
    // qui x.bar è di tipo string
    console.log(x.bar.trim())
  }
}
