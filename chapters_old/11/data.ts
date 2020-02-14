import { Option, some, none } from '../06/Option'

export type Unvalidated = 'Unvalidated'
export type Validated = 'Validated'
export type State = Unvalidated | Validated

const isNonEmptyString = (s: string): boolean => s.length > 0

export class Data<M extends State> {
  private readonly M!: M
  static toUpperCase<M extends State>(data: Data<M>): Data<M> {
    return new Data(data.input.toUpperCase())
  }
  private constructor(readonly input: string) {}

  /**
   * since we don't export the constructor itself,
   * users with a string can only create Unvalidated values
   */
  static make(input: string): Data<Unvalidated> {
    return new Data(input)
  }

  /**
   * returns none if the data doesn't validate
   */
  static validate(
    data: Data<Unvalidated>
  ): Option<Data<Validated>> {
    return isNonEmptyString(data.input)
      ? some(new Data(data.input))
      : none
  }
}

/**
 * can only be fed the result of a call to validate!
 */
export function use(data: Data<Validated>): void {
  console.log('using ' + data.input)
}
