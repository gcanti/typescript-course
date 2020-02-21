// chapters/introduction/bottom.ts

export function raise(message: string): never {
  throw new Error(message)
}

export function absurd<A>(_x: never): A {
  return raise('absurd')
}
