export type Action =
  | { type: 'ADD_TODO'; text: string }
  | {
      type: 'UPDATE_TODO'
      id: number
      text: string
      completed: boolean
    }
  | { type: 'DELETE_TODO'; id: number }

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export interface State {
  todos: Array<Todo>
}

declare const getNextId: (s: State) => number

export const reducer = (s: State, a: Action): State => {
  switch (a.type) {
    case 'ADD_TODO':
      return {
        todos: [
          ...s.todos,
          {
            id: getNextId(s),
            text: a.text,
            completed: false
          }
        ]
      }
    case 'UPDATE_TODO':
      return {
        todos: s.todos.map(
          todo => (todo.id === a.id ? a : todo)
        )
      }
    case 'DELETE_TODO':
      return {
        todos: s.todos.filter(({ id }) => id !== a.id)
      }
  }
}
