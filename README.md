<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Introduzione](#introduzione)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Introduzione

Questo corso mira ad esporre una serie di tecniche per sfruttare al massimo la _type safety_ che offre il linguaggio TypeScript.

> Type safe usually refers to languages that ensure that an operation is working on the right kind of data at some point
before the operation is actually performed. This may be at compile time or at runtime.

**Obbiettivo**. (ambizioso): eliminare gli errori a runtime.

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

**Definizione**. Una funzione _parziale_ `f: X -> Y` è una funzione che non è definita per tutti i valori del suo dominio `X` (`Y` è chiamato il _codominio_).

Viceversa una funzione definita per tutti i valori del dominio è detta _totale_.

**Esempio**. La funzione `head`

```ts
function head(xs: Array<number>): number {
  return xs[0]
}

const x: number = head([]) // no error
```

**Esempio**. La funzione `readFileSync`

```ts
import * as fs from "fs"

const s: string = fs.readFileSync("", "utf8")
// throws "no such file or directory"
```

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
