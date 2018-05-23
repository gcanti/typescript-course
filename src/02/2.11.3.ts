/*

  Esercizio: manipolazione di unioni taggate, estrarre o escludere dei membri

*/

export type ExtractTaggedUnionMember<
  U,
  tagName,
  tagValue
> = never

export type ExcludeTaggedUnionMember<
  U,
  tagName,
  tagValue
> = never

// tests

import { AssertEquals } from '../equals'

type MyType =
  | { type: 'foo'; a: string }
  | { type: 'bar'; b: number }
  | { type: 'baz'; c: boolean }

// $ExpectError .
type E1 = ExtractTaggedUnionMember<MyType, 'typ', 'foo'>
// $ExpectError .
type E2 = ExtractTaggedUnionMember<MyType, 'type', 'a'>
type S1 = AssertEquals<
  ExtractTaggedUnionMember<MyType, 'type', 'foo'>,
  { type: 'foo'; a: string },
  'T'
>
type S2 = AssertEquals<
  ExtractTaggedUnionMember<MyType, 'type', 'foo' | 'bar'>,
  { type: 'foo'; a: string } | { type: 'bar'; b: number },
  'T'
>

// $ExpectError .
type E3 = ExcludeTaggedUnionMember<MyType, 'typ', 'foo'>
// $ExpectError .
type E4 = ExcludeTaggedUnionMember<MyType, 'type', 'a'>
type S3 = AssertEquals<
  ExcludeTaggedUnionMember<MyType, 'type', 'foo'>,
  { type: 'bar'; b: number } | { type: 'baz'; c: boolean },
  'T'
>
type S4 = AssertEquals<
  ExcludeTaggedUnionMember<MyType, 'type', 'foo' | 'bar'>,
  { type: 'baz'; c: boolean },
  'T'
>
