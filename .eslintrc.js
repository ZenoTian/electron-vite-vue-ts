module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    'vue/setup-compiler-macros':true
  },
  'parser': 'vue-eslint-parser',
  parserOptions: { 'parser': '@typescript-eslint/parser' },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' }
    ],
    '@typescript-eslint/no-var-requires': 'off',
    quotes: ['warn', 'single'],
    semi: ['error', 'never'],
  },
  ignorePatterns: [
    'node_modules/**',
    '!.cz-config.js',
    'dist/**'
  ]
}
