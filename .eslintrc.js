module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser' },
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['node_modules/**', '!.cz-config.js', 'dist/**'],
}
