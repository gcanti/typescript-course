/*

  Esercizio: modellare un albero binario e costruire il seguente albero

    1
   / \
  2   3
     / \
    4   5
         \
          6
*/

export type BinaryTree<A> =
  | { type: 'Empty' }
  | {
      type: 'Node'
      value: A
      left: BinaryTree<A>
      right: BinaryTree<A>
    }

const empty: BinaryTree<never> = { type: 'Empty' }

const node = <A>(
  a: A,
  left: BinaryTree<A>,
  right: BinaryTree<A>
): BinaryTree<A> => {
  return {
    type: 'Node',
    value: a,
    left,
    right
  }
}

const tree = node(
  1,
  node(2, empty, empty),
  node(
    3,
    node(4, empty, empty),
    node(5, empty, node(5, empty, empty))
  )
)
