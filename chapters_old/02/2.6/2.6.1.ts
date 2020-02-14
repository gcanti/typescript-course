export interface Person {
  readonly name: string
  readonly age: number
}

declare const person: Person

person.age = 42 // Cannot assign to 'age' because
// it is a constant or a read-only property

interface ImmutableDictionary {
  readonly [key: string]: number
}

declare const dict: ImmutableDictionary

dict['foo'] = 1 // Index signature in type
// 'ImmutableDictionary' only permits reading

interface Point {
  x: number
  y: number
}

type ImmutablePoint = Readonly<Point>
/*
type ImmutablePoint = {
    readonly x: number;
    readonly y: number;
}
*/

class Point2D {
  constructor(readonly x: number, readonly y: number) {}
}
