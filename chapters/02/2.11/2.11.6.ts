export type Equals<A, B> = [A] extends [B]
  ? ([B] extends [A] ? 'T' : 'F')
  : 'F'

type A = Equals<string | null, string>

export type Equals2<A, B> = A extends B
  ? (B extends A ? 'T' : 'F')
  : 'F'

type A2 = Equals2<string | null, string>
/*
type A2 = "T" | "F"
*/
