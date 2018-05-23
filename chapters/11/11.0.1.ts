export type Phantom<M> = { value: number }

declare function f(x: Phantom<string>): void

declare const x: Phantom<string>

f(x)

declare const y: Phantom<number>

f(y)
