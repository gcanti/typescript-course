<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduzione](#introduzione)
  - [Setup](#setup)
  - [Come eseguire gli esercizi del corso](#come-eseguire-gli-esercizi-del-corso)
    - [`$ExpectType` e `$ExpectError`](#expecttype-e-expecterror)
  - [Il type system di TypeScript è strutturale](#il-type-system-di-typescript-%C3%A8-strutturale)
  - [Funzioni parziali](#funzioni-parziali)
  - [Strutture dati mutabili](#strutture-dati-mutabili)
  - [Il tipo `object`](#il-tipo-object)
  - [I tipi `any`, `never` e `unknown`](#i-tipi-any-never-e-unknown)
- [Tour delle feature avanzate](#tour-delle-feature-avanzate)
  - [Inline declarations](#inline-declarations)
  - [Polimorfismo](#polimorfismo)
  - [Overloadings](#overloadings)
  - [Raffinamenti con le custom type guards](#raffinamenti-con-le-custom-type-guards)
  - [Lifting di un valore: l'operatore `typeof`](#lifting-di-un-valore-loperatore-typeof)
- [Definition file](#definition-file)
  - [Un problema serio: le API JavaScript](#un-problema-serio-le-api-javascript)
- [TDD (Type Driven Development)](#tdd-type-driven-development)
- [ADT (Algebraic Data Types)](#adt-algebraic-data-types)
- [Error handling funzionale](#error-handling-funzionale)
- [Finite state machines](#finite-state-machines)
- [Come migliorare la type inference delle fun- zioni polimorfiche](#come-migliorare-la-type-inference-delle-fun--zioni-polimorfiche)
- [Simulazione dei tipi nominali](#simulazione-dei-tipi-nominali)
- [Refinements e smart constructors](#refinements-e-smart-constructors)
- [Phantom types](#phantom-types)
- [Newtypes](#newtypes)
- [Validazione a runtime](#validazione-a-runtime)
- [Covarianza e controvarianza](#covarianza-e-controvarianza)
- [Parse, don't validate](#parse-dont-validate)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Introduzione

Questo corso mira ad esporre una serie di tecniche per sfruttare al massimo la _type safety_ che offre il linguaggio TypeScript.

> Type safe usually refers to languages that ensure that an operation is working on the right kind of data at some point
> before the operation is actually performed. This may be at compile time or at runtime.

**Obbiettivo**. (ambizioso) eliminare gli errori a runtime.

![](images/type-safety.png)

## Setup

```sh
npm i -g typescript@latest
git clone https://github.com/gcanti/typescript-course.git
cd typescript-course
npm install
```

## Come eseguire gli esercizi del corso

```sh
npx eslint test/<filename>.ts
```

**Osservazione**. Le soluzioni fornite nel repository `typescript-course` costituiscono solo un punto di referimento, **in generale gli esercizi possono ammettere piu` di una soluzione possibile**.

### `$ExpectType` e `$ExpectError`

```ts
// chapters/introduction/expect.ts

// API to test
declare function sum(a: number, b: number): number

// $ExpectError
sum(1, 'a')

// $ExpectType number
sum(1, 2)
```

## Il type system di TypeScript è strutturale

> TypeScript is a structural type system. When we compare two different types, regardless of where they came from, if the types of all members are compatible, then we say the types themselves are compatible. - Documentazione ufficiale

**Esempio**. Due classi sono compatibili se sono compatibili i loro campi

```ts
// chapters/introduction/structural.ts

export class A {}

class B {}

class C {
  constructor(public value: number) {}
}

declare function f(a: A): void

f(new A())
f(new B())
f(new C(1))
f({})
f(f)

declare function g(c: C): void

g(new C(1))
// $ExpectError
g(new A())
```

## Funzioni parziali

Una grande fonte di problemi e bug sono le funzioni parziali, specialmente in TypeScript, vediamone la definizione:

**Definizione**. Una funzione _parziale_ `f: X ⟶ Y` è una funzione che non è definita per tutti i valori del suo dominio `X` (`Y` è chiamato il _codominio_).

Viceversa una funzione definita per tutti i valori del dominio è detta _totale_.

**Esempio**. La funzione `head`

```ts
// chapters/introduction/head.ts

function head(xs: Array<number>): number {
  return xs[0]
}

export const result: number = head([]) // no error
```

**Esempio**. La funzione `readFileSync`

```ts
// chapters/introduction/readFileSync.ts

import * as fs from 'fs'

export const result: string = fs.readFileSync('', 'utf8')
// throws "no such file or directory"
```

**Osservazione**. Il problema maggiore nel lanciare eccezioni all'interno del body di una funzione è che questo fatto non si riflette nella sua firma, quindi il comportamento della funzione **non è codificato a livello del type system** di TypeScript.

Una funzione parziale `f : X ⟶ Y` può essere sempre ricondotta ad una funzione totale `f'` aggiungendo un valore speciale (chiamiamolo `None`) _non appartenente al codominio_ e associandolo ad ogni valore di `X` per cui `f` non é definita

```
f': X ⟶ Y ∪ None
```

Chiamiamo `Option(Y) = Y ∪ None`

```
f': X ⟶ Option(Y)
```

Torneremo a parlare del tipo `Option` più avanti.

**Suggerimento**. Cercate di definire sempre funzioni totali.

## Strutture dati mutabili

In TypeScript usare strutture dati **mutabili** può condurre ad errori a runtime

```ts
// chapters/introduction/mutable.ts

const xs: Array<string> = ['foo', 'bar']
const ys: Array<string | undefined> = xs

ys.push(undefined)

export const result = xs.map(s => s.trim())
// runtime error:
// Cannot read property ’trim’ of undefined
```

**Suggerimento**. Cercate di usare strutture dati immutabili.

## Il tipo `object`

Il tipo `object` rappresenta tutti i valori meno quelli primitivi (compresi `null` e `undefined`)

```ts
// chapters/introduction/object.ts

export const x1: object = { foo: 'bar' }

export const x2: object = [1, 2, 3]

// $ExpectError
export const x3: object = 1

// $ExpectError
export const x4: object = 'foo'

// $ExpectError
export const x5: object = true

// $ExpectError
export const x6: object = null

// $ExpectError
export const x7: object = undefined
```

## I tipi `any`, `never` e `unknown`

Se pensiamo ai tipi come insiemi, allora gli _abitanti_ di un tipo sono gli elementi di quell'insieme.

```ts
// chapters/introduction/inhabitants.ts

// gli abitanti sono tutte le stringhe
export type A = string

// gli abitanti sono tutti i numeri
export type B = number

// questo `e un "literal type" e contiene un solo abitante:
// la stringa "foo"
export type C = 'foo'
```

**Esercizio**: Quanti abitanti ha questo tipo?

```ts
export type D = 0 | 1
```

**Definizione**. Un tipo `A` si dice _sottotipo_ di un tipo `B` se ogni abitante di `A` è abitante di `B`. Si dice _supertipo_ se vale la proprietà inversa.

**Esempio**. Il tipo `C` è sottotipo del tipo `string`. Il tipo `number` è supertipo del tipo `D`.

**Esercizio**. In che relazione sono i seguenti tipi?

```ts
type T1 = { a: string }
type T2 = { b: number; a: string }
```

- `T1` è sottotipo di `T2`?
- `T2` è sottotipo di `T1`?
- nessuno dei due

```ts
type T3 = { a: string; b: boolean }
type T4 = { b: number; a: string }
```

- `T3` è sottotipo di `T4`?
- `T4` è sottotipo di `T3`?
- nessuno dei due

**Definizione**. Un tipo `B` si dice _bottom type_ se è sottotipo di ogni altro tipo.

Il tipo `never` di TypeScript non contiene abitanti ed è un bottom type.

```ts
// chapters/introduction/bottom.ts

export function raise(message: string): never {
  throw new Error(message)
}

export function absurd<A>(_x: never): A {
  return raise('absurd')
}
```

**Definizione**. Un tipo `T` si dice top type\_ se è supertipo di ogni altro tipo.

Il tipo `any` é sia top type sia bottom type. Viene usato per "disabilitare"
il type-checker (a volte risulta necessario). Usatelo con parsimonia.

Un problema di `any` é che non é adatto a rappresentare **input non validati**.

**Esempio**. `JSON.parse` è unsafe dato che il tipo di ritorno è `any`.

```ts
const payload = `{"a":1}`
const x = JSON.parse(payload)
// `x` è di tipo `any`
x.bar.trim() // runtime error: Cannot read property 'trim' of undefined
```

Fortunatamente esiste una possibile soluzione: utilizzare il tipo `unknown`.

Il tipo `unknown` è un top type ma **non è un bottom type**.

Per poter utilizzare un valore di tipo `unknown` occorre _raffinarlo_

**Esempio**. Un `JSON.parse` type safe (o quasi, può lanciare eccezioni)

```ts
// chapters/introduction/parse.ts

export const parse: (input: string) => unknown = JSON.parse

const payload = `{"bar":"foo"}`

const x = parse(payload)

x.bar // static error: Object is of type 'unknown'
```

**Osservazione**. Come potete vedere dall'esempio ridefinire il tipo di una funzione può essere fatto in modo che non ci sia alcun costo a runtime.

Raffinare un valore vuol dire scrivere del codice specifico che permette di provare al type checker
alcune caratteristiche sul tipo del valore

```ts
if (typeof x === 'object') {
  // x ha tipo object | null
  if (x !== null) {
    // x ha tipo object
    const bar = (x as { [key: string]: unknown }).bar
    if (typeof bar === 'string') {
      // bar ha tipo string
      console.log(bar.trim())
    }
  }
}
```

Vedremo piu` avanti come sia possibile eliminare il boilerplate utilizzando le _custom type guard_.

# Tour delle feature avanzate

## Inline declarations

Un _definition file_ contiene solo dichiarazioni di tipi e servono a descrivere le API pubbliche di una package.
I definition file costituiscono un ponte tra il mondo untyped di JavaScript e quello types di TypeScript.
Tipicamente il nome di un definition file termina con `.d.ts`.

Le dichiarazione all'interno del codice invece che nei definition file sono particolarmente utili quando si stia esplorando
una soluzione e per fare velocemente delle prove di type checking.

**Esempio**. Costanti, variabili, funzioni e classi

```ts
// chapters/advanced/inline-declarations.ts

// costanti
export declare const a: number

// variabili
export declare let b: number

// funzioni
export declare function f(x: string): number
export declare const g: (x: string) => number

// classi
export declare class Foo {
  public value: string
  constructor(value: string)
}
```

In molti degli esercizi sfrutteremo questa feature lavorando solo sulle dichiarazioni invece di preoccuparci dell'implementazione.

## Polimorfismo

> Parametric polymorphism refers to when the type of a value contains one or more (unconstrained) type variables,
> so that the value may adopt any type that results from substituting those variables with concrete types.

Una funzione viene detta _polimorfica_ se può gestire diversi tipi parametrizzati da uno o più _type parameter_,
_monomorfica_ altrimenti.

```ts
// una funzione monomorfica
declare function fst(tuple: [number, number]): number

// una funzione polimorfica
declare function fst<A>(tuple: [A, A]): A
```

Le funzioni polimorfiche favoriscono una implementazione corretta:

```ts
// compila
function fst(xs: tuple: [number, number]): number {
  return 1
}

// non compila
function fst<A>(tuple: [A, A]): A {
  return 1
}
```

Esempio notevole è la funzione identità che ammette una sola implementazione possibile

```ts
function identity<A>(a: A): A {
  return a
}
```

**Suggerimento**. Quando possibile, cercate di definire funzioni polimorfiche.

**Esercizio**. Date le firme delle seguenti funzioni, cosa possiamo dire del loro comportamento?

```ts
declare function f(xs: Array<number>): Array<number>
declare function g<A>(xs: Array<A>): Array<A>
```

## Overloadings

Gli overloading servono a rendere più precise le firme delle funzioni.

Vediamo un esempio pratico.

- la funzione `f` deve restituire un numero se l'input è una stringa
- la funzione `f` deve restituire una stringa se l'input è un numero

Usare un'unione non è soddisfacente

```ts
declare function f(x: string | number): number | string

// x1: string | number
const x1 = f('foo')
// x2: string | number
const x2 = f(1)
```

Definendo due overloading possiamo rendere preciso il tipo della funzione

```ts
// chapters/advanced/overloadings.ts

declare function f(x: number): string
declare function f(x: string): number
declare function f(x: string | number): number | string

// x3: number
const x3 = f('foo')
// x4: string
const x4 = f(1)
```

La terza firma di `f` serve solo a guidare l'implementazione e **non comparirà tra quelle disponibili** in fase di utilizzo della funzione.

Gli overloading possono essere definiti anche per i metodi di una classe

```ts
class G {
  mymethod(x: number): string
  mymethod(x: string): number
  mymethod(x: string | number): number | string {
    ...
  }
}
```

**Esercizio**. Tipizzare la funzione `pipe` (composizione di funzioni).

[./test/advanced/overloadings/pipe.ts](./test/advanced/overloadings/pipe.ts)

## Raffinamenti con le custom type guards

Le custom type guard servono a _raffinare_ i tipi. Un raffinemento di un tipo `A` è un tipo `B` tale che per ogni abitante `b` di `B` è anche un abitante di `A`. Un altro modo per esprimere questa condizione è dire che ogni elemento di `B` soddisfa un _predicato_ su `A`.

**Definizione**. Un _predicato_ (sul tipo `A`) è una funzione con la seguente firma:

```ts
type Predicate<A> = (a: A) => boolean
```

**Esempio**. In TypeScript la sintassi per definire un predicato non è sufficiente per raffinare un tipo

```ts
// chapters/advanced/refinements-I.ts

export function isString(x: unknown): boolean {
  return typeof x === 'string'
}

export function f(x: string | number): number {
  if (isString(x)) {
    // qui x non è raffinato
    return x.length // error
  } else {
    return x // error
  }
}
```

Invece viene utilizzata questa sintassi (che definisce una _custom type guard_):

```ts
type Refinement<A, B extends A> = (a: A) => a is B
```

**Osservazione**. Notate che `B` _deve essere assegnabile_ ad `A`.
O, in altre parole, `B` deve essere un sottotipo di `A`.

> La keyword `extends` può essere usata per _mettere in relazione_ due type parameter

In particolare `extends` viene spesso usata per definire dei vincoli su di un type parameter
che siano basati su un altro type parameter (come nel tipo `Refinement`).

**Esempio**.

```ts
// chapters/advanced/refinements-II.ts

export function isString(x: unknown): x is string {
  return typeof x === 'string'
}

export function f(x: string | number): number {
  if (isString(x)) {
    // qui x è di tipo string
    return x.length
  } else {
    // qui x è di tipo number
    return x
  }
}
```

**Esempio**. Riprendiamo l'esempio del capitolo precedentemente

```ts
// chapters/advanced/refinements-III.ts

export const parse: (input: string) => unknown = JSON.parse

const payload = `{"bar":"foo"}`

const x = parse(payload)

/*
if (typeof x === 'object') {
  // x ha tipo object | null
  if (x !== null) {
    // x ha tipo object
    const bar = (x as { [key: string]: unknown }).bar
    if (typeof bar === 'string') {
      // bar ha tipo string
      console.log(bar.trim())
    }
  }
}
*/

function isString(u: unknown): u is string {
  return typeof u === 'string'
}

function isUnknownRecord(u: unknown): u is { [key: string]: unknown } {
  return Object.prototype.toString.call(u) === '[object Object]'
}

if (isUnknownRecord(x)) {
  // qui x è di tipo { [key: string]: unknown }
  if (isString(x.bar)) {
    // qui x.bar è di tipo string
    console.log(x.bar.trim())
  }
}
```

**Esempio**. Alcune custom type guard sono predefinite, un esempio notevole è `Array.isArray`

```ts
const payload = '{"bar":[1,2,3]}'
const x = parse(payload)

if (Array.isArray(x)) {
  // x ha tipo Array<any>
  console.log(x.keys)
}
```

Notate però che `Array.isArray` raffina a `Array<any>`.

**Esercizio**. Definire **e implementare** una versione di `Array.isArray` migliore [./test/advanced/custom-type-guards/isArray.ts](./test/advanced/custom-type-guards/isArray.ts).

**Esercizio**. Definire **e implementare** una custom type guard che raffina un tipo `unknown` in un `Array<number>` [./test/advanced/custom-type-guards/isArrayOfNumbers.ts](./test/advanced/custom-type-guards/isArrayOfNumbers.ts).

**Esercizio**. È possibile generalizzare la soluzione precedente? [./test/advanced/custom-type-guards/isArrayOf.ts](./test/advanced/custom-type-guards/isArrayOf.ts)

## Lifting di un valore: l'operatore `typeof`

I valori e i tipi vivono in mondi separati, però è possibile passare dal mondo dei valori a quello dei tipi
sfruttando l'operatore `typeof`.

**Osservazione**. Attenzione, in questo caso non stiamo parlando dell'omonimo operatore `typeof` di JavaScript, che lavora value-level, ma dell'operatore `typeof` di TypeScript, che lavora type-level.

**Esempio**. Ricavare il tipo di un oggetto

```ts
// chapters/advanced/typeof.ts

export const x = {
  foo: 'foo',
  baz: 1
}

// value-level ---v
export const X = typeof x
// "object"

// type-level ----v
export type X = typeof x
/*
type X = {
  foo: string;
  baz: number;
}
*/
```

## Immutabilità: il modificatore `readonly`

Il modificatore `readonly` e il tipo predefinito `Readonly` aggiungono supporto per le strutture dati immutabili a TypeScript:

```ts
// chapters/advanced/immutability.ts

//
// structs
//

export interface Person {
  readonly name: string
  readonly age: number
}

declare const person: Person

person.age = 42 // Cannot assign to 'age' because it is a read-only property

//
// records
//

interface ImmutableRecord {
  readonly [key: string]: number
}

declare const r: ImmutableRecord

r['foo'] = 1 // Index signature in type 'ImmutableRecord' only permits reading

//
// Per rendere immutabile un tipo già definito è possibile usare il tipo predefinito `Readonly`.
// Per la sua implementazione si veda la sezione Mapped types
//

export interface Point {
  x: number
  y: number
}

export type ImmutablePoint = Readonly<Point>
/*
type ImmutablePoint = {
    readonly x: number;
    readonly y: number;
}
*/

declare const p: ImmutablePoint

p.x = 1 // Cannot assign to 'x' because it is a read-only property

//
// classes
//

export class Point2D {
  constructor(readonly x: number, readonly y: number) {}
}

declare const p2: Point2D

p2.x = 1 // Cannot assign to 'x' because it is a read-only property

//
// tuples
//
export type ImmutableTuple = readonly [string, number]

declare const t: ImmutableTuple

t[1] = 1 // Cannot assign to '1' because it is a read-only property

//
// arrays
//

const x: ReadonlyArray<number> = [1, 2, 3]
x.push(4) // Property 'push' does not exist on type 'readonly number[]'
```

Oltre a `ReadonlyArray` ci sono interfacce analoghe per `Map` e `Set`, rispettivamente `ReadonlyMap` e `ReadonlySet`.

**Esercizio**. Rendere immutabile la seguente interfaccia

```ts
interface Person {
  name: {
    first: string
    last: string
  }
  interests: Array<string>
}
```

[./test/advanced/immutability/interface.ts](./test/advanced/immutability/interface.ts)

## Index types

### Index type query operator: `keyof`

Così come è possibile, dato un oggetto, ricavare **il valore** delle chiavi tramite la funzione `Object.keys`

```ts
const point = { x: 1, y: 2 }
const pointKeys = Object.keys(point)
// [ "x", "y" ]
```

così è possibile ricavare **il tipo** delle chiavi di un oggetto (come unione) usando l'operatore `keyof`

```ts
interface Point {
  x: number
  y: number
}

type PointKeys = keyof Point
/*
type PointKeys = "x" | "y"
*/
```

`keyof` può operare anche sugli array

```ts
type ArrayKeys = keyof Array<number>
/*
type ArrayKeys = number | "length" | "toString" |
"toLocaleString" | "push" | "pop" | "concat" | "join" |
"reverse" | "shift" | "slice" | "sort" | "splice" |
"unshift" | "indexOf" | "lastIndexOf" | "every" | "some" |
"forEach" | "map" | "filter" | "reduce" | "reduceRight" |
"entries" | "keys" | "values" | "find" | "findIndex" |
"fill" | "copyWithin"
*/
```

e le tuple

```ts
type TupleKeys = keyof [string, number]
/*
type TupleKeys = number | "0" | "1" | "length" | "toString" |
"toLocaleString" | "push" | "pop" | "concat" | "join" |
"reverse" | "shift" | "slice" | "sort" | "splice" |
"unshift" | "indexOf" | "lastIndexOf" | "every" |
"some" | "forEach" | "map" | "filter" | "reduce" |
"reduceRight" | "entries" | "keys" | "values" |
"find" | "findIndex" | "fill" | "copyWithin"
*/
```

**Esercizio**. Rendere type safe la seguente funzione `translate`

```ts
export const translations = {
  when: 'Quando',
  where: 'Dove'
}

export declare function translate(key: string): string
```

[./test/advanced/typeof/translate.ts](./test/advanced/typeof/translate.ts)

### Indexed access operator: `[]`

Così come è possibile, dato un oggetto, ricavare il valore di una sua proprietà usando l'accesso per indice

```ts
const person = { name: 'Giulio', age: 44 }
const name = person['name']
```

così l'operatore `T[K]` permette di estrarre il tipo del campo `K` dal tipo `T`

```ts
interface Person {
  name: string
  age: number
}

type Name = Person['name']
/*
type Name = string
*/

type Age = Person['age']
/*
type Age = number
*/

Person['foo'] // error
```

**Esercizio**. Ricavare il tipo del campo `baz` della seguente interfaccia

```ts
export interface Foo {
  foo: {
    bar: {
      baz: number
      quux: string
    }
  }
}
```

[./test/advanced/indexed-access-operator/Foo.ts](./test/advanced/indexed-access-operator/Foo.ts)

**Esercizio**. Ricavare il tipo delle chiavi del campo `bar` dell'interfaccia `Foo` definita nel precedente esercizio.

[./test/advanced/indexed-access-operator/bar.ts](./test/advanced/indexed-access-operator/bar.ts)

**Esercizio**. Tipizzare la seguente funzione `get` in modo che gli argomenti e il tipo di ritorno siano i più precisi possibile

```ts
declare function get(key: string, obj: unknown): unknown
```

[./test/advanced/indexed-access-operator/get.ts](./test/advanced/indexed-access-operator/get.ts)

**Esercizio**. Estrarre il tipo della prima e della seconda componente della seguente tupla

```ts
export type Tuple = [number, string, boolean]
```

[./test/advanced/indexed-access-operator/tuple.ts](./test/advanced/indexed-access-operator/tuple.ts)

**Osservazione**. Come è possibile estrarre l'**unione** dei tipi di una tupla? Accedendo con l'indice generico `number`

```ts
export type X = [string, number]

export type ValuesOfX = X[number]
```

**Esercizio**. Tipizzare la seguente funzione `set` in modo che gli argomenti e il tipo di ritorno siano i più precisi possibile

```ts
export declare function set(k: string, v: unknown, o: unknown): unknown
```

[./test/advanced/indexed-access-operator/set.ts](./test/advanced/indexed-access-operator/set.ts)

**Osservazione**. Si noti che `Object.keys` è tipizzato così

```ts
Object.keys: (o: {}) => string[]
```

**Esercizio**. Perchè? E' possibile rendere il tipo più preciso?

## Mapped types

TypeScript fornisce un modo per creare nuovi tipi basati su tipi già definiti, i _mapped types_.

La formula generale di un mapped type è la seguente

```
{ [K in U] : f(K) }
```

ove

- `K` è una variabile
- `U` è una unione
- `f` è una funzione di `K`

**Esempio**. Creare un _option object_

```ts
export type Flag = 'option1' | 'option2' | 'option3'

export type Options = { [K in Flag]: boolean }
/*
type Options = {
    option1: boolean;
    option2: boolean;
    option3: boolean;
}
*/
```

Come soluzione è possibile anche usare il tipo predefinito `Record` (per la sua definizione vedi oltre)

```ts
type Options = Record<Flag, boolean>
```

**Esercizio**. Derivare un record di predicati dalla seguente interfaccia

```ts
export interface X {
  a: string
  b: number
  c: boolean
}
```

[./test/advanced/mapped-types/predicates.ts](./test/advanced/mapped-types/predicates.ts)

**Esercizio**. Dato lo string literal type

```ts
export type Key = 'foo'
```

derivare il tipo

```ts
export type Singleton = {
  foo: number
}
```

[./test/advanced/mapped-types/singleton.ts](./test/advanced/mapped-types/singleton.ts)

Vediamo ora qualche tipo (pre)definito definito grazie a questa feature

**Esempio**. `Partial<T>`

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = { [P in keyof T]?: T[P] }
```

**Osservazione**. Il modificatore `?` rende opzionali tutti i campi.

**Esempio**. `Required<T>`

```ts
/**
 * Make all properties in T required
 */
type Required<T> = { [P in keyof T]-?: T[P] }
```

**Osservazione**. Il modificatore `-?` rende obbligatori tutti i campi.

**Esempio**. `Readonly<T>`

```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = { readonly [P in keyof T]: T[P] }
```

**Osservazione**. Il modificatore `readonly` rende tutti i campi in sola lettura (per un solo livello).

**Esempio**. `Pick<T, K>`

```ts
/**
 * From T pick a set of properties K
 */
type Pick<T, K extends keyof T> = { [P in K]: T[P] }
```

**Esempio**. `Record<K, T>`

```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = { [P in K]: T }
```

**Esercizio**. Tipizzare la funzione `pick` in modo che il tipo di ritorno sia il più preciso possibile

```ts
export declare function pick(ks: Array<string>, o: object): unknown
```

[./test/advanced/mapped-types/pick.ts](./test/advanced/mapped-types/pick.ts)

TODO: altri esercizi sui mapped type

# Definition file

Un definition file contiene solo dichiarazioni di tipi e servono a descrivere le API pubbliche di una package.
Tipicamente il nome di un definition file termina con `.d.ts`.

E' possibile far generare a TypeScript i definition file dei moduli scritti in TypeScript impostando nel `tsconfig.json` il flag `declaration: true`.

## Un problema serio: le API JavaScript

Le API delle librerie JavaScript sono pensate per essere ergonomiche e consumate da JavaScript,
aggiungere un definition file a posteriori è spesso problematico.

In più spesso i definition file ufficiali non sono del tutto soddisfacenti.

Possibili soluzioni:

- cambiare libreria
- definire un custom definition file
- definire una funzione wrapper con una tipizzazione sana
- castare ad una tipizzazione sana
- module augmentation / declaration merging

TODO: esempio per ciascuna di queste opzioni

# TDD (Type Driven Development)

# ADT (Algebraic Data Types)

# Error handling funzionale

# Finite state machines

# Come migliorare la type inference delle fun- zioni polimorfiche

# Simulazione dei tipi nominali

# Refinements e smart constructors

# Phantom types

# Newtypes

# Validazione a runtime

# Covarianza e controvarianza

# Parse, don't validate

Per far fare dei salti di qualità ad una codebase gli step sono:

- introdurre un type system, TypeScript in questo caso (investimento molto costoso)
- sfruttarlo al massimo (ritorno di investimento)

Per sfruttare al massimo il type system e rendere solido il codice occorre:

> spostare gli invarianti dal runtime al type system

Le tecniche utilizzate per ottenere questo risultato si vedono spesso in ambito funzionale è vero, ma francamente sono solo di buon senso.
Puoi anche non parlare mai di "funzionale", e vendere semplicemente il fatto di sfruttare al meglio il type system.

Più specificatamente vuol dire:

- parse don't validate (in particolare decodificare alla frontiera)
- concentrare il massimo dell'informazione nelle firme

Ogni volta che ti capita di validare qualcosa perdi un'occasione se contemporaneamente non porti l'informazione al type system.

Questa firma è un disastro da questo punto di vista:

```
declare function validateNonEmptyString(s: string): string
```

- se la validazione ha successo, dal punto di vista del type system _non succede nulla_, sempre `string` mi restituisce
- se la validazione fallisce, dal punto di vista del type system ancora _non succede nulla_, in più io non ho idea di cosa succede davvero, devo guardarmi il body della funzione o la documentazione (se c'è...)

Per il primo punto, una cosa sensata è cambiare il tipo di ritorno (cioè appunto passare a parlare di "parsing" invece che di validazione)

```
declare function parseNonEmptyString(s: string): NonEmptyString
```

Per il secondo punto una cosa sensata è rendere esplicito (per lo sviluppatore e per il type system) cosa succede in caso di errore

```
declare function parseNonEmptyString(s: string): Either<MyError, NonEmptyString>
```

Non c'è nulla di strettamente funzionale qui, quindi volendo non c'è nemmeno bisogno di citarlo, c'è solo il buon senso di fare tesoro dell'occasione.

Il fatto di usare proprio `Either` non ha alcuna rilevanza, va bene qualsiasi altra struttura dati, basta rendere chiaro nella firma cosa succede in caso di errore (rendere chiaro anche al type system!). `Result`, `Try`, ecc.. vanno benissimo, lo scopo principale è comunque raggiunto.

Lanciare invece non va bene perchè, evitando del tutto di menzionare la programmazione funzionale, in TypeScript non c'è alcuna sintassi per dichiarare il tipo di errore lanciato.

Ora, prima di andare avanti, questo ragionamento è convincente? Perchè se non è convincente è inutile venderci qualcosa sopra.
