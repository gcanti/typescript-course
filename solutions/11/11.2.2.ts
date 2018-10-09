/*

  Esercizio: definire il middleware `hello`

*/

import { Request, Response, RequestHandler } from 'express'

const OK: 200 = 200
const Created: 201 = 201
const Found: 302 = 302
const BadRequest: 400 = 400
const Unauthorized: 401 = 401
const Forbidden: 403 = 403
const NotFound: 404 = 404
const MethodNotAllowed: 405 = 405
const NotAcceptable: 406 = 406

export const Status = {
  OK,
  Created,
  Found,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  NotAcceptable
}

export type Status = typeof Status[keyof typeof Status]

export type StatusOpen = 'StatusOpen'
export type HeadersOpen = 'HeadersOpen'
export type BodyOpen = 'BodyOpen'
export type ResponseEnded = 'ResponseEnded'
export type State = StatusOpen | HeadersOpen | BodyOpen | ResponseEnded

export class Middleware<S extends State> {
  readonly S!: S
  static start(res: Response): Middleware<StatusOpen> {
    return new Middleware(res)
  }
  private constructor(readonly res: Response) {}
  status(
    this: Middleware<StatusOpen>,
    status: Status
  ): Middleware<HeadersOpen> {
    this.res.status(status)
    return this as any
  }
  headers(
    this: Middleware<HeadersOpen>,
    headers: Record<string, string>
  ): Middleware<BodyOpen> {
    for (const field in headers) {
      this.res.setHeader(field, headers[field])
    }
    return this as any
  }
  send(this: Middleware<BodyOpen>, body: string): Middleware<ResponseEnded> {
    this.res.send(body)
    return this as any
  }
}

const hello = (res: Response): Middleware<ResponseEnded> =>
  Middleware.start(res)
    .status(OK)
    .headers({ 'Content-Type': 'text/html' })
    .send('hello')

//
// usage
//

import * as express from 'express'

const app = express()

app.get('/', (_, res) => hello(res))

app.listen(3000, () => {
  console.log(`Server running on port 3000`)
})
