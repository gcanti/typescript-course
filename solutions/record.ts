/*

  Esercizio: tipizzere una interfaccia che deve avere solo campi di un determinato tipo

*/

type B = string

type A<K extends string> = Record<K, B>

interface C extends A<keyof C> {
  q: B
  z: B
}

declare const c: C
