// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const stylistic = require('@stylistic/eslint-plugin');
const globals = require('globals');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = defineConfig([
  expoConfig,
  {
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@/assets', './assets/index.ts'],
            ['@', './src'],
          ],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  {
    plugins: {
      '@stylistic': stylistic,
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/no-trailing-spaces': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: [
      '**/__tests__/**/*',
      '**/*.{test,spec}.{js,jsx,ts,tsx}',
    ],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    rules: {
      'import/no-named-as-default': 'off',
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
