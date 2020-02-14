import { Iso } from '../../solutions/02/2.7.5'

interface Newtype<M, A> {
  readonly M: M
  readonly A: A
}

const unsafeCoerce = <A, B>(a: A): B => a as any

const anyIso = new Iso<any, any>(unsafeCoerce, unsafeCoerce)

const iso = <S extends Newtype<any, any>>(): Iso<S, S['A']> =>
  anyIso

interface Celsius extends Newtype<'Celsius', number> {}
const celsiusIso = iso<Celsius>()

interface Fahrenheit extends Newtype<'Fahrenheit', number> {}
const fahrenheitIso = iso<Fahrenheit>()

const celsius2fahrenheit = (celsius: Celsius): Fahrenheit =>
  fahrenheitIso.wrap(celsiusIso.unwrap(celsius) * 1.8 + 32)

const far: Fahrenheit = fahrenheitIso.from(33.8)

celsius2fahrenheit(far)
// static error: Type '"Fahrenheit"' is not
// assignable to type '"Celsius"'

interface NonZero
  extends Newtype<
    { readonly NonZero: unique symbol },
    number
  > {}

interface Positive
  extends Newtype<
    NonZero['M'] & {
      readonly Positive: unique symbol
    },
    number
  > {}

declare function inverse(nz: NonZero): NonZero
declare function mult(a: Positive, b: Positive): Positive

declare const nonZero: NonZero
declare const positive: Positive

inverse(nonZero) // ok
inverse(positive) // ok
mult(positive, nonZero) // error: Property 'Positive' is missing in type '{ readonly NonZero: unique symbol; }'
