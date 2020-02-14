import { Option, none, some } from 'fp-ts/lib/Option'

class _NonZero {
  private readonly brand!: symbol
  constructor(readonly value: number) {}
}

export interface NonZero extends _NonZero {}

export const create = (n: number): Option<NonZero> =>
  n === 0 ? none : some(new _NonZero(n))
