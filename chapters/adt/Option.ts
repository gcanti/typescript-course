// chapters/adt/Option.ts

export type Option<A> =
  | { _tag: 'None' } // represents a failure
  | { _tag: 'Some'; value: A } // represents a success

// a nullary constructor can be implemented as a constant
export const none: Option<never> = { _tag: 'None' }

export const some = <A>(value: A): Option<A> => ({ _tag: 'Some', value })

export const fold = <A, R>(onNone: () => R, onSome: (a: A) => R) => (
  fa: Option<A>
): R => (fa._tag === 'None' ? onNone() : onSome(fa.value))

function identity<A>(a: A): A {
  return a
}

export const fromNullable = <A>(a: A | null | undefined): Option<A> =>
  a == null ? none : some(a)

export const toNullable: <A>(fa: Option<A>) => A | null = fold(
  () => null,
  identity
)

export const toUndefined: <A>(fa: Option<A>) => A | undefined = fold(
  () => undefined,
  identity
)
