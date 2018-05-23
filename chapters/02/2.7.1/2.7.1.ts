export interface Point {
  x: number
  y: number
}

type PointKeys = keyof Point
/* same as
type PointKeys = "x" | "y"
*/

type ArrayKeys = keyof Array<number>
/* same as
type ArrayKeys = "length" | "toString" | "toLocaleString" |
"push" | "pop" | "concat" | "join" | "reverse" | "shift" |
"slice" | "sort" | "splice" | "unshift" | "indexOf" |
"lastIndexOf" | "every" | "some" | "forEach" | "map" |
"filter" | "reduce" | "reduceRight" | "entries" | "keys"
| "values" | "find" | "findIndex" | "fill" | "copyWithin"
*/

type TupleKeys = keyof [string, number]
/* same as
type TupleKeys = "0" | "1" | "length" | "toString" |
"toLocaleString" | "push" | "pop" | "concat" | "join" |
"reverse" | "shift" | "slice" | "sort" | "splice" |
"unshift" | "indexOf" | "lastIndexOf" | "every" |
"some" | "forEach" | "map" | "filter" | "reduce" |
"reduceRight" | "entries" | "keys" | "values" |
"find" | "findIndex" | "fill" | "copyWithin"
*/
