// chapters/introduction/mutable.ts

const xs: Array<string> = ['foo', 'bar']
const ys: Array<string | undefined> = xs

ys.push(undefined)

export const result = xs.map(s => s.trim())
// runtime error:
// Cannot read property ’trim’ of undefined
