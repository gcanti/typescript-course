// chapters/advanced/as-const.ts

// const x1: (string | number)[]
export const x1 = ['a', 1]

// const x2: readonly ["a", 1]
export const x2 = ['a', 1] as const

// const x3: { a: string; }
export const x3 = { a: 'a' }

// const x4: { readonly a: "a"; }
export const x4 = { a: 'a' } as const
