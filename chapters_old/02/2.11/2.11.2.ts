export interface Person {
  firstName: string
  lastName: string
  age: number
}

type NotAge = Exclude<keyof Person, 'age'>
type Explanation =
  | ('firstName' extends 'age' ? never : 'firstName')
  | ('lastName' extends 'age' ? never : 'lastName')
  | ('age' extends 'age' ? never : 'age')

type Result = Pick<Person, NotAge>
/* same as
type Result = {
    firstName: string;
    lastName: string;
}
*/
