export const payload = `{"bar":"foo"}`
// `x` è di tipo `any`
const x = JSON.parse(payload)
x.bar.trim() // runtime error: Cannot read property 'trim' of undefined
