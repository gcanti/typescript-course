// chapters/fsm/door-class.ts

export type Open = 'Open'
export type Closed = 'Closed'
export type State = Open | Closed

export class Door<S extends State> {
  private readonly S!: S
  static start: Door<Closed> = new Door(0)
  private constructor(readonly count: number) {}
  open(this: Door<Closed>): Door<Open> {
    return new Door(this.count)
  }
  close(this: Door<Open>): Door<Closed> {
    return new Door(this.count)
  }
  ring(this: Door<Closed>): Door<Closed> {
    return new Door(this.count + 1)
  }
}

// $ExpectError
Door.start.close()

// $ExpectError
Door.start.open().ring()

Door.start
  .ring()
  .open()
  .close()
  .ring()
  .open() // ok

// $ExpectError
export const x: Door<Closed> = Door.start.ring().open()

export const y: Door<Closed> = Door.start
  .ring()
  .open()
  .close() // ok
