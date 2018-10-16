export const x = {
  foo: 'foo',
  baz: 1
}

// value-level
const X = typeof x
// "object"

// type-level
type X = typeof x
/*
type X = {
  foo: string;
  baz: number;
}
*/
