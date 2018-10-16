import { Option, none, some } from '../06/Option'

class NonZero {
  private readonly brand!: symbol
  static create(n: number): Option<NonZero> {
    return n === 0 ? none : some(new NonZero(n))
  }
  private constructor(readonly value: number) {}
}

const inverse = (x: NonZero): number => 1 / x.value
