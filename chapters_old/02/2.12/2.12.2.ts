export function tuple<T extends Array<any>>(...t: T): T {
  return t
}

// x: [number, string]
const x = tuple(1, 'foo')
// y: [number, string, boolean]
const y = tuple(1, 'foo', true)
