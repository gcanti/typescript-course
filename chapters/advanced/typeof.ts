// chapters/advanced/typeof.ts

export const x = {
  foo: 'foo',
  baz: 1
}

// value-level ---v
export const X = typeof x
// "object"

// type-level ----v
export type X = typeof x
/*
type X = {
  foo: string;
  baz: number;
}
*/
