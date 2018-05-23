import { Iso } from '../../src/Iso'

interface Person {
  name: string
  age: number
}

const iso = new Iso<[string, number], Person>(
  ([name, age]) => ({ name, age }),
  ({ name, age }) => [name, age]
)
