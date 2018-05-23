import { Foo } from './foo'

declare module './Foo' {
  interface Foo {
    doSomethingElse(): number
  }
}

Foo.prototype.doSomethingElse = function() {
  return this.doSomething().length
}
