// chapters/advanced/refinements-II.ts

export function isString(x: unknown): x is string {
  return typeof x === 'string'
}

export function f(x: string | number): number {
  if (isString(x)) {
    // qui x è di tipo string
    return x.length
  } else {
    // qui x è di tipo number
    return x
  }
}
