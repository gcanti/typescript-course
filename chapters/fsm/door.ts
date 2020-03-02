// chapters/fsm/door.ts

export type Open = 'Open'
export type Closed = 'Closed'
export type State = Open | Closed

export class Door<S extends State> {
  private readonly S!: S
  constructor(readonly count: number) {}
}

export const start: Door<Closed> = new Door(0)

export function close(door: Door<Open>): Door<Closed> {
  return new Door(door.count)
}

export function open(door: Door<Closed>): Door<Open> {
  return new Door(door.count)
}

export function ring(door: Door<Closed>): Door<Closed> {
  return new Door(door.count + 1)
}

// $ExpectError
close(start)

// $ExpectError
ring(open(start))

open(ring(close(open(ring(start))))) // ok
