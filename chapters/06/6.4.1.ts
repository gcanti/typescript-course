declare function readFile(
  path: string,
  callback: (err: Error | undefined, data?: string) => void
): void

import { Either } from './Either'

declare function betterReadFile(
  path: string,
  callback: (result: Either<Error, string>) => void
): void
