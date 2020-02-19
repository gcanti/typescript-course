// chapters/01/expect.ts

// API to test
declare function sum(a: number, b: number): number

// $ExpectError
sum(1, 'a')

// $ExpectType number
sum(1, 2)
