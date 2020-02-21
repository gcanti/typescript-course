// chapters/introduction/object.ts

export const x1: object = { foo: 'bar' }

export const x2: object = [1, 2, 3]

// $ExpectError
export const x3: object = 1

// $ExpectError
export const x4: object = 'foo'

// $ExpectError
export const x5: object = true

// $ExpectError
export const x6: object = null

// $ExpectError
export const x7: object = undefined
