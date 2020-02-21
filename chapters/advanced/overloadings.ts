// chapters/advanced/overloadings.ts

declare function f(x: number): string
declare function f(x: string): number
declare function f(x: string | number): number | string

// x3: number
const x3 = f('foo')
// x4: string
const x4 = f(1)
