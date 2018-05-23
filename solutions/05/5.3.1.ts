export type Selection<A> =
  | { type: 'Empty' }
  | { type: 'NonEmpty'; items: Array<A>; current: number }
