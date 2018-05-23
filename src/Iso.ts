export class Iso<S, A> {
  constructor(
    readonly get: (s: S) => A,
    reverseGet: (a: A) => S
  ) {}
}
