// ------------------------------------------------------
// source
// ------------------------------------------------------

export const translations = {
  when: 'Quando',
  where: 'Dove'
}

export declare function translate(key: string): string

// ------------------------------------------------------
// tests
// ------------------------------------------------------

// $ExpectType string
translate('when')
// $ExpectError .
translate('foo')
