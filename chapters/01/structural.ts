// chapters/01/structural.ts

export class A {}

class B {}

class C {
  constructor(public value: number) {}
}

declare function f(a: A): void

f(new A())
f(new B())
f(new C(1))
f({})
f(f)

declare function g(c: C): void

g(new C(1))
// $ExpectError
g(new A())
