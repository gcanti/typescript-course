// chapters/introduction/readFileSync.ts

import * as fs from 'fs'

export const result: string = fs.readFileSync('', 'utf8')
// throws "no such file or directory"
