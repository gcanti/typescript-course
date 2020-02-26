export type These<E, A> =
  | {
      _tag: 'Left'
      left: E
    }
  | {
      _tag: 'Right'
      right: A
    }
  | {
      _tag: 'Both'
      left: E
      right: A
    }

export const left = <E = never, A = never>(left: E): These<E, A> => ({
  _tag: 'Left',
  left
})

export const right = <E = never, A = never>(right: A): These<E, A> => ({
  _tag: 'Right',
  right
})

export const both = <E, A>(left: E, right: A): These<E, A> => ({
  _tag: 'Both',
  left,
  right
})

export const fold = <E, A, R>(
  onLeft: (left: E) => R,
  onRight: (right: A) => R,
  onBoth: (left: E, right: A) => R
): ((fa: These<E, A>) => R) => {
  return fa => {
    switch (fa._tag) {
      case 'Left':
        return onLeft(fa.left)
      case 'Right':
        return onRight(fa.right)
      case 'Both':
        return onBoth(fa.left, fa.right)
    }
  }
}
