import { Event, evt1, evt2 } from './11.3'

type EventMap = { [key: string]: Event<unknown> }

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
