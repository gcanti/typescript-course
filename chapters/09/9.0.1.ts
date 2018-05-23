export class A {
  readonly type!: 'A'
}

export class B {
  readonly type!: 'B'
}

declare function f(a: A): void

f(new A())
f(new B())
