/*

  Esercizio: modellare una struttura dati che rappresenta alternativamente

  - un successo di tipo `A`
  - un errore bloccante di tipo `L`
  - un successo di tipo `A` e un errore non bloccante di tipo `L`

*/

export type These<L, A> =
  | {
      type: 'This'
      error: L
    }
  | {
      type: 'That'
      success: A
    }
  | {
      type: 'Both'
      error: L
      success: A
    }
