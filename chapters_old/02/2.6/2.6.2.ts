const x: ReadonlyArray<number> = [1, 2, 3]
x.push(4) // error: Property 'push' does not exist on type 'ReadonlyArray<number>'
