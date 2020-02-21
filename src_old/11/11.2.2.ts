/*

  Esercizio: rendere type-safe il metodo `status`

*/

import { Response } from 'express'
import { HeadersOpen } from './11.2.1'

const middlewareKO = (
  res: Response
): Middleware<HeadersOpen> => {
  return Middleware.start(res).status(-1)
}

const middlewareOK = (
  res: Response
): Middleware<HeadersOpen> => {
  return Middleware.start(res).status(200)
}
