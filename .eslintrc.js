module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier', 'json'],
};
