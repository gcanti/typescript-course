export class NonEmptyArray<A> {
  constructor(readonly head: A, readonly tail: Array<A>) {}
  toArray(): Array<A> {
    return [this.head].concat(this.tail)
  }
}
