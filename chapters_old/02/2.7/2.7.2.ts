export interface Person {
  name: string
  age: number
}

type Name = Person['name']
/*
type Name = string
*/

type Age = Person['age']
/*
type Age = number
*/

type Unknown = Person['foo'] // error
