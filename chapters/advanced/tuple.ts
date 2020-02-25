// chapters/advanced/tuple.ts

export function tuple<T extends Array<unknown>>(...t: T): T {
  return t
}

// x: [number, string]
export const x = tuple(1, 'foo')
// y: [number, string, boolean]
export const y = tuple(1, 'foo', true)
