// chapters/adt/Either.ts

export type Either<E, A> =
  | { _tag: 'Left'; left: E } // represents a failure
  | { _tag: 'Right'; right: A } // represents a success

export const left = <E = never, A = never>(left: E): Either<E, A> => ({
  _tag: 'Left',
  left
})

export const right = <E = never, A = never>(right: A): Either<E, A> => ({
  _tag: 'Right',
  right
})

export const fold = <E, A, R>(
  onLeft: (left: E) => R,
  onRight: (right: A) => R
) => (fa: Either<E, A>): R =>
  fa._tag === 'Left' ? onLeft(fa.left) : onRight(fa.right)
