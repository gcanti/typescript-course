// chapters/polymorphic.ts

export declare function map<A, B>(f: (a: A) => B, fa: Array<A>): Array<B>

map(s => s.length, ['foo'])

export declare function mapCurried<A, B>(
  f: (a: A) => B
): (fa: Array<A>) => Array<B>

// $ExpectError
mapCurried(s => s.length)(['foo']) // Object is of type 'unknown'

mapCurried((s: string) => s.length)(['foo']) // ok

mapCurried<string, number>(s => s.length)(['foo']) // ok

export declare function mapCurriedFlipped<A>(
  fa: Array<A>
): <B>(f: (a: A) => B) => Array<B>

mapCurriedFlipped(['foo'])(s => s.length) // ok
