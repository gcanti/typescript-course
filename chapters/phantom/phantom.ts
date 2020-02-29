// export type Phantom<A> = { value: string }

export class Phantom<S> {
  private readonly S!: S
  constructor(readonly value: string) {}
}

// export class Data<S> {
//   private readonly S!: S
//   constructor(readonly value: string) {}
// }

// function changeType<A, B>(data: Data<A>): Data<B> {
//   return new Data(data.value)
// }

export type Unvalidated = 'Unvalidated'
export type Validated = 'Validated'
export type Encrypted = 'Encrypted'
export type State = Unvalidated | Validated | Encrypted

const isNonEmptyString = (s: string): boolean => s.length > 0

export class Data<S extends State> {
  private readonly S!: S
  private constructor(readonly value: string) {}

  static make(input: string): Data<Unvalidated> {
    return new Data(input)
  }

  static validate(data: Data<Unvalidated>): Data<Validated> | undefined {
    return isNonEmptyString(data.value) ? new Data(data.value) : undefined
  }

  static encrypt(data: Data<Validated>): Data<Encrypted> {
    const encryption = data.value // <= some encryption process
    return new Data(encryption)
  }

  static toUpperCase<S extends Unvalidated | Validated>(
    data: Data<S>
  ): Data<S> {
    return new Data(data.value.toUpperCase())
  }
}

declare function storePassword(password: Data<Encrypted>): void

storePassword('foo') // Argument of type '"foo"' is not assignable to parameter of type 'Data<"Encrypted">'

storePassword(Data.make('foo')) // Argument of type 'Data<"Unvalidated">' is not assignable to parameter of type 'Data<"Encrypted">'

const validated = Data.validate(Data.make('foo'))
if (validated) {
  storePassword(validated) // Argument of type 'Data<"Validated">' is not assignable to parameter of type 'Data<"Encrypted">'

  storePassword(Data.encrypt(validated)) // ok
}

const validated2 = Data.validate(Data.make('foo'))
if (validated2) {
  Data.validate(validated2) // Argument of type 'Data<"Validated">' is not assignable to parameter of type 'Data<"Unvalidated">'
}
