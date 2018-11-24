/*

  Esercizio: definire un wrapper della funzione `readFile` in modo che utiizzi `Either` nel tipo di ritorno

*/

import { Either, left, right } from 'fp-ts/lib/Either'

declare function readFile(path: string): Promise<string>
