export class Newtype<M, A> {
  private readonly M!: M
  constructor(readonly value: A) {}
}

class Celsius extends Newtype<'Celsius', number> {}
class Fahrenheit extends Newtype<'Fahrenheit', number> {}

const celsius2fahrenheit = (celsius: Celsius): Fahrenheit =>
  new Fahrenheit(celsius.value * 1.8 + 32)

const far = new Fahrenheit(33.8)

celsius2fahrenheit(far)
// static error: Type '"Fahrenheit"' is not assignable
// to type '"Celsius"'
