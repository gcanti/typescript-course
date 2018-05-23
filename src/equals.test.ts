import { AssertEquals } from './equals'

// tests

type S1 = AssertEquals<string, string, 'T'>
type S2 = AssertEquals<string, number, 'F'>
// $ExpectError .
type E1 = AssertEquals<string, number, 'T'> // error
type S3 = AssertEquals<string | number, string | number, 'T'>
type S4 = AssertEquals<string | number, string, 'F'>
// $ExpectError .
type E4 = AssertEquals<string | number, string, 'T'> // error
type S5 = AssertEquals<{ a: string }, { a: string }, 'T'>
// $ExpectError .
type E5 = AssertEquals<{ a: string }, { a: number }, 'T'> // error
