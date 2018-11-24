/*

  Esercizio: definire un wrapper della funzione `readFile` in modo che utiizzi `Either` nel tipo di ritorno

*/

import { Either, left, right } from 'fp-ts/lib/Either'

declare function readFile(path: string): Promise<string>

export const tryCatch = <L, A>(
  promise: Promise<A>,
  onrejected: (reason: unknown) => L
): Promise<Either<L, A>> => {
  return promise.then(
    a => right<L, A>(a),
    reason => left<L, A>(onrejected(reason))
  )
}

export const betterReadFile = (
  path: string
): Promise<Either<Error, string>> => {
  return tryCatch(
    readFile(path),
    err => new Error(String(err))
  )
}
