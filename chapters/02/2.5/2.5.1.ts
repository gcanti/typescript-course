export const x = {
  foo: 'foo',
  baz: 1
}

type X = typeof x
/* same as
type X = {
  foo: string;
  baz: number;
}
*/
