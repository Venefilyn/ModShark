module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-debugger': 'off',
    'quotes': [2, 'single', 'avoid-escape'],
    'indent': ['error', 2]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
