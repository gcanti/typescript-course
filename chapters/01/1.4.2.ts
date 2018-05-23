export const head = (xs: Array<number>): number => {
  return xs[0]
}

const x: number = head([]) // no error
