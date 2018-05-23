export type List<A> = { type: 'Nil' } | { type: 'Cons'; head: A; tail: List<A> }
