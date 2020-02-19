// chapters/01/head.ts

function head(xs: Array<number>): number {
  return xs[0]
}

export const result: number = head([]) // no error
