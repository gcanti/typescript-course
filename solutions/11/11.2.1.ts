export type Open = 'Open'
export type Closed = 'Closed'
export type State = Open | Closed

export class Door<S extends State> {
  readonly S!: S
  static start(): Door<Closed> {
    return new Door(0)
  }
  private constructor(readonly count: number) {}
  open(this: Door<Closed>): Door<Open> {
    return this as any
  }
  close(this: Door<Open>): Door<Closed> {
    return this as any
  }
  ring(this: Door<Closed>): Door<Closed> {
    return new Door(this.count + 1)
  }
}

// tests

import * as assert from 'assert'

const x: Door<'Closed'> = Door.start()
  .ring()
  .open()
  .close()
  .ring()
assert.strictEqual(x.count, 2)
