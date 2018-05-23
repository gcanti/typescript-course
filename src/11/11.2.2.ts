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

export class Middleware {}

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
