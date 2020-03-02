// ------------------------------------------------------
// source
// ------------------------------------------------------

import { Response } from 'express'

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
