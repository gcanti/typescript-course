// chapters/advanced/immutability.ts

//
// structs
//

export interface Person {
  readonly name: string
  readonly age: number
}

declare const person: Person

person.age = 42 // Cannot assign to 'age' because it is a read-only property

//
// records
//

interface ImmutableRecord {
  readonly [key: string]: number
}

declare const r: ImmutableRecord

r['foo'] = 1 // Index signature in type 'ImmutableDictionary' only permits reading

//
// Per rendere immutabile un tipo già definito è possibile usare il tipo predefinito `Readonly`.
// Per la sua implementazione si veda la sezione Mapped types
//

export interface Point {
  x: number
  y: number
}

export type ImmutablePoint = Readonly<Point>
/*
type ImmutablePoint = {
    readonly x: number;
    readonly y: number;
}
*/

declare const p: ImmutablePoint

p.x = 1 // Cannot assign to 'x' because it is a read-only property

//
// classes
//

export class Point2D {
  constructor(readonly x: number, readonly y: number) {}
}

declare const p2: Point2D

p2.x = 1 // Cannot assign to 'x' because it is a read-only property

//
// tuples
//
export type ImmutableTuple = readonly [string, number]

declare const t: ImmutableTuple

t[1] = 1 // Cannot assign to '1' because it is a read-only property

//
// arrays
//

const x: ReadonlyArray<number> = [1, 2, 3]
x.push(4) // Property 'push' does not exist on type 'readonly number[]'
