export type Either<L, A> = Left<L, A> | Right<L, A>

export class Left<L, A> {
  readonly type: 'Left' = 'Left'
  constructor(readonly value: L) {}
  map<B>(f: (a: A) => B): Either<L, B> {
    return new Left(this.value)
  }
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return this as any
  }
  fold<R>(whenLeft: (l: L) => R, whenRight: (a: A) => R): R {
    return whenLeft(this.value)
  }
}

export class Right<L, A> {
  readonly type: 'Right' = 'Right'
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Either<L, B> {
    return new Right(f(this.value))
  }
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return f(this.value)
  }
  fold<R>(whenLeft: (l: L) => R, whenRight: (a: A) => R): R {
    return whenRight(this.value)
  }
}

export const left = <L, A>(l: L): Either<L, A> => new Left(l)

export const right = <L, A>(a: A): Either<L, A> => new Right(a)
