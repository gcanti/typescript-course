export type Option<A> = None<A> | Some<A>

export class None<A> {
  readonly type: 'None' = 'None'
  map<B>(f: (a: A) => B): Option<B> {
    return new None()
  }
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return this as any
  }
  fold<R>(whenSome: () => R, whenNone: (a: A) => R): R {
    return whenSome()
  }
}

export class Some<A> {
  readonly type: 'Some' = 'Some'
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Option<B> {
    return new Some(f(this.value))
  }
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return f(this.value)
  }
  fold<R>(whenNone: () => R, whenSome: (a: A) => R): R {
    return whenSome(this.value)
  }
}

export const none: Option<never> = new None()

export const some = <A>(a: A): Option<A> => new Some(a)

export const fromNullable = <A>(
  a: A | null | undefined
): Option<A> => (a == null ? none : some(a))

export const toNullable = <A>(fa: Option<A>): A | null =>
  fa.fold(() => null, a => a)
