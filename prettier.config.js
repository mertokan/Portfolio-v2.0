/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  semi: false,
  printWidth: 100,
  trailingComma: es5,
  tabWidth: 2,
  bracketSpacing: false,
  jsxBracketSameLine: false,
  arrowParens: always,
  endOfLine: auto,
  jsxSingleQuote: true,
  proseWrap: preserve,
  quoteProps: as - needed,
  useTabs: false,
  htmlWhitespaceSensitivity: css,

  plugins: ['prettier-plugin-tailwindcss'],
}
