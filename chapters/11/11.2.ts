export type State = 'S1' | 'S2' | 'S3'

export class Node<S extends State, A> {
  readonly S!: S
  constructor(readonly value: A) {}
}

export const start = (value: string): Node<'S1', string> =>
  new Node(value)

const len = (
  input: Node<'S1', string>
): Node<'S2', number> => new Node(input.value.length)

const double = (
  input: Node<'S2', number>
): Node<'S2', number> => new Node(input.value * 2)

const inc = (
  input: Node<'S2', number>
): Node<'S2', number> => new Node(input.value + 1)

const gt10 = (
  input: Node<'S2', number>
): Node<'S3', boolean> => new Node(input.value > 10)

double(start('foo')) // error
double(len(start('foo'))) // ok

class Node2<S extends State, A> {
  readonly S!: S
  static start(value: string): Node2<'S1', string> {
    return new Node2(value)
  }
  private constructor(private readonly value: A) {}
  len(this: Node2<'S1', string>): Node2<'S2', number> {
    return new Node2(this.value.length)
  }
  double(this: Node2<'S2', number>): Node2<'S2', number> {
    return new Node2(this.value * 2)
  }
  inc(this: Node2<'S2', number>): Node2<'S2', number> {
    return new Node2(this.value + 1)
  }
  gt10(this: Node2<'S2', number>): Node2<'S3', boolean> {
    return new Node2(this.value > 10)
  }
}

Node2.start('foo').double()
// static error: Type '"S1"' is not assignable to type '"S2"'

Node2.start('foo')
  .len()
  .double() // ok

const final: Node2<'S3', boolean> = Node2.start('foo')
  .len()
  .gt10()
