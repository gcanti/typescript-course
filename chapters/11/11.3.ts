export class Event<D> {
  readonly D!: D
  constructor(readonly name: string) {}
}

interface EventEmitter {
  emit: <D>(evt: Event<D>, data: D) => void
  listen: <D>(
    evt: Event<D>,
    handler: (data: D) => void
  ) => void
}

const evt1 = new Event<string>('evt1')
const evt2 = new Event<number>('evt2')

declare const ee: EventEmitter

ee.emit(evt1, 'foo') // ok
ee.emit(evt1, 1) // static error
ee.emit(evt2, 1) // ok

ee.listen(evt1, data => console.log(data.trim()))
ee.listen(evt2, data => console.log(data * 2))

type EventMap = { [key: string]: Event<any> }

const map = {
  evt1,
  evt2
}

type Handlers<EM extends EventMap> = {
  [K in keyof EM]: (data: EM[K]['D']) => void
}

type MyHandlers = Handlers<typeof map>
/* same as
type MyHandlers = {
    evt1: (data: string) => void;
    evt2: (data: number) => void;
}
*/
