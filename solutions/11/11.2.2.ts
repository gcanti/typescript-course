/*

  Esercizio: definire il middleware `hello`

*/

import { Response } from 'express'
import {
  BodyOpen,
  HeadersOpen,
  ResponseEnded,
  State,
  StatusOpen
} from './11.2.1'

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

type Status = (typeof Status)[keyof typeof Status]

class Middleware<S extends State> {
  private readonly S!: S
  static start(res: Response): Middleware<StatusOpen> {
    return new Middleware(res)
  }
  private constructor(readonly res: Response) {}
  status(
    this: Middleware<StatusOpen>,
    status: Status
  ): Middleware<HeadersOpen> {
    this.res.status(status)
    return new Middleware(this.res)
  }
  headers(
    this: Middleware<HeadersOpen>,
    headers: Record<string, string>
  ): Middleware<BodyOpen> {
    for (const field in headers) {
      this.res.setHeader(field, headers[field])
    }
    return new Middleware(this.res)
  }
  send(
    this: Middleware<BodyOpen>,
    body: string
  ): Middleware<ResponseEnded> {
    this.res.send(body)
    return new Middleware(this.res)
  }
}

const middlewareKO = (
  res: Response
): Middleware<HeadersOpen> => {
  // $ExpectError .
  return Middleware.start(res).status(-1)
}

const middlewareOK = (
  res: Response
): Middleware<HeadersOpen> => {
  return Middleware.start(res).status(200)
}
