export class Event<D> {
  readonly D!: D
  constructor(readonly name: string) {}
}

export const evt1 = new Event<string>('evt1')
export const evt2 = new Event<number>('evt2')

interface EventEmitter {
  emit: <D>(evt: Event<D>, data: D) => void
  listen: <D>(
    evt: Event<D>,
    handler: (data: D) => void
  ) => void
}

declare const ee: EventEmitter

ee.emit(evt1, 'foo') // ok
ee.emit(evt1, 1) // static error
ee.emit(evt2, 1) // ok

ee.listen(evt1, data => console.log(data.trim()))
ee.listen(evt2, data => console.log(data * 2))
