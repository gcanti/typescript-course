// chapters/NonEmptyString.ts

export interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol // ensures uniqueness across modules / packages
}

export type NonEmptyString = string & NonEmptyStringBrand

import { Option, none, some } from 'fp-ts/lib/Option'

// runtime check implemented as a custom type guard
function isNonEmptyString(s: string): s is NonEmptyString {
  return s.length > 0
}

export function makeNonEmptyString(s: string): Option<NonEmptyString> {
  return isNonEmptyString(s) ? some(s) : none
}

export interface NaturalBrand {
  readonly Natural: unique symbol
}

export type Natural = number & NaturalBrand

function isNatural(n: number): n is Natural {
  return Number.isInteger(n) && n >= 0
}

export function makeNatural(n: number): Option<Natural> {
  return isNatural(n) ? some(n) : none
}

export interface Person {
  name: NonEmptyString
  age: Natural
}

function person(name: NonEmptyString, age: Natural): Person {
  return { name, age }
}

// $ExpectError
person('', -1.2)
