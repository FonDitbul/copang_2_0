module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['.eslintrc.js', '**/build/*.**.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'react/react-in-jsx-scope': 'off',
  },
};
