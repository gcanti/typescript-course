import { Option, none, some } from 'fp-ts/lib/Option'

export interface NonZero {
  readonly brand: unique symbol
  readonly value: number
}

export const create = (n: number): Option<NonZero> =>
  n === 0 ? none : some({ value: n } as any)

const x = create(1)

const y = x.map(nz => nz.value)
