import { Either, right, left } from './Either'

declare function readFile(path: string): Promise<string>

declare function betterReadFile(path: string): Promise<Either<Error, string>>

export const attempt = <L, A>(
  promise: Promise<A>,
  onrejected: (reason: {}) => L
): Promise<Either<L, A>> => {
  return promise.then(
    a => right<L, A>(a),
    reason => left<L, A>(onrejected(reason))
  )
}
