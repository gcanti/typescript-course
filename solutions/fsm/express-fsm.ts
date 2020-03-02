// ------------------------------------------------------
// source
// ------------------------------------------------------

import { Response } from 'express'

export type StatusOpen = 'StatusOpen'
export type HeadersOpen = 'HeadersOpen'
export type BodyOpen = 'BodyOpen'
export type ResponseEnded = 'ResponseEnded'
export type State = StatusOpen | HeadersOpen | BodyOpen | ResponseEnded

class Middleware<S extends State> {
  private readonly S!: S
  static start(res: Response): Middleware<StatusOpen> {
    return new Middleware(res)
  }
  private constructor(readonly res: Response) {}
  status(
    this: Middleware<StatusOpen>,
    status: number
  ): Middleware<HeadersOpen> {
    this.res.status(status)
    return new Middleware(this.res)
  }
  headers(
    this: Middleware<HeadersOpen>,
    headers: Record<string, string>
  ): Middleware<HeadersOpen> {
    for (const field in headers) {
      this.res.setHeader(field, headers[field])
    }
    return new Middleware(this.res)
  }
  closeHeaders(this: Middleware<HeadersOpen>): Middleware<BodyOpen> {
    return new Middleware(this.res)
  }
  send(this: Middleware<BodyOpen>, body: string): Middleware<ResponseEnded> {
    this.res.send(body)
    return new Middleware(this.res)
  }
}

const hello = (res: Response): Middleware<ResponseEnded> => {
  return Middleware.start(res)
    .status(200)
    .headers({ 'Content-Type': 'text/html' })
    .closeHeaders()
    .send('<h1>Hello type-level hackers!</h1>')
}

// ------------------------------------------------------
// tests
// ------------------------------------------------------

import * as express from 'express'

const app = express()

app.get('/', (_, res) => hello(res))

app.listen(3000, () => {
  console.log(`Server running on port 3000`)
})
