module.exports = {
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['eslint-plugin-expect-type'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-plugin-expect-type/recommended'
  ]
}
