export type BinaryTree<A> =
  | { type: 'Leaf' }
  | {
      type: 'Node'
      left: BinaryTree<A>
      value: A
      right: BinaryTree<A>
    }
