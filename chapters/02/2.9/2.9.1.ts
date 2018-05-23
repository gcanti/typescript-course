export interface Person {
  name: string
  age: number
}

const getName = <T extends { name: string }>(x: T): string => x.name
