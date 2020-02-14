export const map = <A, B>(
  f: (a: A) => B,
  fa: Array<A>
): Array<B> => fa.map(f)

// map: <string, number>
map(s => s.length, ['foo'])

// notate che però non c'è alcun suggerimento da parte dell'intellisense
// map()

// meglio sarebbe

const mapFlipped = <A, B>(
  fa: Array<A>,
  f: (a: A) => B
): Array<B> => fa.map(f)

// ora TypeScript è in grado già di inferire il tipo `A`
// mapFlipped(['foo'], )

const mapCurried = <A, B>(f: (a: A) => B) => (
  fa: Array<A>
): Array<B> => fa.map(f)

// mapCurried: mapCurried: <string, number>(f:
// (a: string) => number) => (fa: string[]) => number[]
mapCurried((s: string) => s.length)(['foo'])

mapCurried<string, number>(s => s.length)(['foo'])

const mapCurriedFlipped = <A>(fa: Array<A>) => <B>( // <= B è importante che sia introdotto qui
  f: (a: A) => B
): Array<B> => fa.map(f)

// mapCurriedFlipped: <string>(fa: string[]) =>
// <B>(f: (a: string) => B) => B[]
mapCurriedFlipped(['foo'])(s => s.length)
