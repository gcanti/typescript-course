import { Either, right, left } from '../06/Either'

// top type
type mixed = {} | null | undefined

type Errors = Array<string>

const show = (m: mixed): string => {
  return JSON.stringify(m)
}

const identity = <A>(a: A): A => a

class Type<A, O = A> {
  readonly A!: A
  readonly O!: O
  constructor(
    readonly name: string,
    readonly is: (m: mixed) => m is A,
    readonly decode: (m: mixed) => Either<Errors, A>,
    readonly encode: (a: A) => O
  ) {}
}

type TypeOf<T extends Type<any>> = T['A']
type OutputOf<T extends Type<any>> = T['O']

const string = new Type<string>(
  'string',
  (m): m is string => typeof m === 'string',
  m =>
    typeof m === 'string'
      ? right(m)
      : left([`expected a string, got ${show(m)}`]),
  identity
)

const number = new Type<number>(
  'number',
  (m): m is number => typeof m === 'number',
  m =>
    typeof m === 'number'
      ? right(m)
      : left([`expected a number, got ${show(m)}`]),
  identity
)

const boolean = new Type<boolean>(
  'boolean',
  (m): m is boolean => typeof m === 'boolean',
  m =>
    typeof m === 'boolean'
      ? right(m)
      : left([`expected a boolean, got ${show(m)}`]),
  identity
)

const array = <A, O>(type: Type<A, O>): Type<Array<A>, Array<O>> =>
  new Type(
    `Array<${type.name}>`,
    (m): m is Array<A> => Array.isArray(m) && m.every(type.is),
    m => {
      if (!Array.isArray(m)) {
        return left([`expected an array, got ${show(m)}`])
      } else {
        const errors: Errors = []
        const elements: Array<A> = []
        const len = m.length
        for (let i = 0; i < len; i++) {
          const val = type.decode(m[i])
          switch (val.type) {
            case 'Left':
              errors.push(...val.value)
              break
            case 'Right':
              elements.push(val.value)
              break
          }
        }
        return errors.length > 0 ? left(errors) : right(elements)
      }
    },
    as => as.map(type.encode)
  )

const DateFromMillis = new Type<Date, number>(
  'DateFromMillis',
  (m): m is Date => number.is(m) && !isNaN(new Date(m).getTime()),
  m =>
    number.decode(m).chain(n => {
      const d = new Date(n)
      return isNaN(d.getTime()) ? left([`expected a Date, got ${n}`]) : right(d)
    }),
  a => a.getTime()
)

const ArrayOfNumbers = array(number)

type ArrayOfNumbersT = TypeOf<typeof ArrayOfNumbers>

// console.log(ArrayOfNumbers.decode([1, 2, 3]))
// console.log(ArrayOfNumbers.decode(['foo', true]))
// console.log(ArrayOfNumbers.decode(1))

const ArrayOfDates = array(DateFromMillis)

// console.log(ArrayOfDates.decode([0, 1]))

import * as assert from 'assert'

const law = <A, O>(type: Type<A, O>, m: mixed) => {
  const val = type.decode(m)
  switch (val.type) {
    case 'Left':
      assert.fail('ops')
      break
    case 'Right':
      console.log(val.value)
      console.log(type.encode(val.value))
      assert.deepEqual(type.encode(val.value), m)
      break
  }
}

law(ArrayOfDates, [0, 1])
