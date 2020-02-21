// chapters/introduction/parse.ts

export const parse: (input: string) => unknown = JSON.parse

const payload = `{"bar":"foo"}`

const x = parse(payload)

x.bar // static error: Object is of type 'unknown'

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
