// chapters/advanced/module-augmentation-II.ts

import { Foo } from './module-augmentation-I'

declare module './module-augmentation-I' {
  interface Foo {
    doSomethingElse(): number
  }
}

Foo.prototype.doSomethingElse = function() {
  return this.doSomething().length
}

new Foo().doSomethingElse() // ok
