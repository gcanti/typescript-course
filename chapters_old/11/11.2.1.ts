export type Open = 'Open'
export type Closed = 'Closed'
export type State = Open | Closed

export class Door<S extends State> {
  private readonly S!: S
  constructor(readonly count: number) {}
}

const start: Door<Closed> = new Door(0)

const close = (door: Door<Open>): Door<Closed> =>
  new Door(door.count)

const open = (door: Door<Closed>): Door<Open> =>
  new Door(door.count)

const ring = (door: Door<Closed>): Door<Closed> =>
  new Door(door.count + 1)

// close(start) // error

// ring(open(start)) // error

open(ring(close(open(ring(start))))) // ok
