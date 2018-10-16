import { parse } from '../../01/1.7.3'

const payload = `{"bar":[1,2,3]}`
const x = parse(payload)

if (Array.isArray(x)) {
  // x ha tipo Array<any>
  console.log(x.keys)
}
