export class USD {
  private readonly brand!: symbol
  constructor(readonly value: number) {}
}

export class EUR {
  private readonly brand!: symbol
  constructor(readonly value: number) {}
}

declare function f(usd: USD): void

f(new USD(1))
f(new EUR(1))
