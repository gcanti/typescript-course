import { Data, use } from './data'

const data = Data.make('hello')

use(data) // called without validating the input

Data.validate(data).map(use)

Data.validate(data).chain(validated =>
  Data.validate(validated)
)
