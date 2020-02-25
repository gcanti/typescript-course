// chapters/advanced/conditional-types/typeof.ts

export type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object'

// $ExpectType "string"
export type T0 = TypeName<string>
// $ExpectType "string"
export type T1 = TypeName<'a'>
// $ExpectType "boolean"
export type T2 = TypeName<true>
// $ExpectType "function"
export type T3 = TypeName<() => void>
// $ExpectType "object"
export type T4 = TypeName<string[]>
