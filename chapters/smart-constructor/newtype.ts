// chapters/smart-constructor/newtype.ts

export interface Celsius {
  readonly Celsius: unique symbol
}

export interface Fahrenheit {
  readonly Fahrenheit: unique symbol
}

export interface Iso<S, A> {
  readonly unwrap: (s: S) => A
  readonly wrap: (a: A) => S
}

const unsafeCoerce = <A, B>(a: A): B => a as any

const celsiusIso: Iso<Celsius, number> = {
  unwrap: unsafeCoerce,
  wrap: unsafeCoerce
}

const fahrenheitIso: Iso<Fahrenheit, number> = {
  unwrap: unsafeCoerce,
  wrap: unsafeCoerce
}

export function celsius2fahrenheit(celsius: Celsius): Fahrenheit {
  return fahrenheitIso.wrap(celsiusIso.unwrap(celsius) * 1.8 + 32)
}
