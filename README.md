<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

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
- [Definition file](#definition-file)
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
before the operation is actually performed. This may be at compile time or at runtime.

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
// chapters/01/expect.ts

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
// chapters/01/structural.ts

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
// chapters/01/head.ts

function head(xs: Array<number>): number {
  return xs[0]
}

export const result: number = head([]) // no error
```

**Esempio**. La funzione `readFileSync`

```ts
// chapters/01/readFileSync.ts

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
// chapters/01/mutable.ts

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
// chapters/01/object.ts

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
// chapters/01/inhabitants.ts

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
type T2 = { b: number, a: string }
```

- `T1` è sottotipo di `T2`?
- `T2` è sottotipo di `T1`?
- nessuno dei due

```ts
type T3 = { a: string, b: boolean }
type T4 = { b: number, a: string }
```

- `T3` è sottotipo di `T4`?
- `T4` è sottotipo di `T3`?
- nessuno dei due

**Definizione**. Un tipo `B` si dice _bottom type_ se è sottotipo di ogni altro tipo.

Il tipo `never` di TypeScript non contiene abitanti ed è un bottom type.

```ts
// chapters/01/bottom.ts

export function raise(message: string): never {
  throw new Error(message)
}

export function absurd<A>(_x: never): A {
  return raise('absurd')
}
```

**Definizione**. Un tipo `T` si dice top type_ se è supertipo di ogni altro tipo.

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
// chapters/01/parse.ts

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

# Definition file

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
