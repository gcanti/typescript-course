export const payload = `{"foo":"bar"}`
// `x` è di tipo `any`
const x = JSON.parse(payload)
x.bar.trim() // runtime error: Cannot read property 'trim' of undefined

export type unknown =
  | { [key: string]: any }
  | object
  | number
  | string
  | boolean
  | symbol
  | undefined
  | null
