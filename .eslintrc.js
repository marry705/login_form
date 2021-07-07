module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-hooks',
    'import',
    '@typescript-eslint',
  ],
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'no-bitwise': ['error', { allow: ['~'] }],
    'no-use-before-define': 'off',
    'no-nested-ternary': 'off',
    'max-len': ['error', { code: 160, tabWidth: 4 }],
    'import/extensions': ['error', 'never', { ignorePackages: true }],
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': ['error', { peerDependencies: true }],
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
