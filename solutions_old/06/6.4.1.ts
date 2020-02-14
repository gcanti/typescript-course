/*

  Esercizio: tipizzare `readFile` con `Either`

*/

import { Either, left, right } from 'fp-ts/lib/Either'
import { readFile } from 'fs'

export const betterReadFile = (
  path: string,
  callback: (result: Either<Error, string>) => void
): void => {
  readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(left(err))
    } else {
      callback(right(data))
    }
  })
}
