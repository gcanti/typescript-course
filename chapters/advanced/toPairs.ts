// chapters/advanced/toPairs.ts

declare function toPairs<T extends Array<unknown>>(
  ...t: T
): { [K in keyof T]: [K, T[K]] }

// const x: [["0", number], ["1", string], ["2", boolean]]
const x = toPairs(1, 's', true)
