export type Equals<A, B> = [A] extends [B]
  ? ([B] extends [A] ? 'T' : 'F')
  : 'F'

export type AssertEquals<A, B, Bool extends Equals<A, B>> = [
  A,
  Bool
]
