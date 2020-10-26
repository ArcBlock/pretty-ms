module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'class-methods-use-this': 'off',
    indent: ['error', 2],
    'operator-linebreak': 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'arrow-parens': 'off',
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
    'prefer-object-spread': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/no-unresolved': ['error', { caseSensitive: true, ignore: ['core/'] }],
    'import/no-extraneous-dependencies': 'off',
    'max-len': ['error', { code: 120, ignoreStrings: true, ignoreComments: true }],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-confusing-arrow': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
