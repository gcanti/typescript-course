export const isString = (x: unknown): x is string => {
  return typeof x === 'string'
}

const f = (x: string | number): number => {
  if (isString(x)) {
    // qui x è di tipo string
    return x.length
  } else {
    // qui x è di tipo number
    return x
  }
}
