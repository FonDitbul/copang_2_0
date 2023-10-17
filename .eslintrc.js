module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: './tsconfig.json', // <tsconfigRootDir/ Error>
    // https://stackoverflow.com/questions/74413483/eslint-cypress-parsing-error-eslint-was-configured-to-run-on-tsconfigrootd
    sourceType: 'module',
    workingDirectories: ['frontend', 'backend/*'],
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
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'react/react-in-jsx-scope': 'off',
  },
};
