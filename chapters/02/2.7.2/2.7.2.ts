export interface Person {
  name: string
  age: number
}

type Name = Person['name']
/* same as
type Name = string
*/

type Age = Person['age']
/* same as
type Age = number
*/

type Unknown = Person['foo'] // error

declare function get(key: string, obj: object): any

declare function set(key: string, value: any, o: object): object
