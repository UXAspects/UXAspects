const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': 'off',
      '@angular-eslint/directive-selector': 'off',
      'eol-last': 'off',
      'max-len': 'off',
      radix: 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      'no-underscore-dangle': 'off',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'jsdoc/newline-after-description': 'off',
      'guard-for-in': 'off',
      'quote-props': 'off',
      'prefer-arrow/prefer-arrow-functions': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-output-rename': 'off',
      '@angular-eslint/no-output-on-prefix': 'off',
      'arrow-body-style': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
      '@angular-eslint/template/no-negated-async': 'off',
      '@angular-eslint/directive-class-suffix': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'brace-style': 'off',
      'one-var': 'off',
      '@typescript-eslint/require-await': 'error',
      'no-redeclare': 'error',
      'no-trailing-spaces': 'off',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'off',
    },
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      'no-mixed-spaces-and-tabs': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/role-has-required-aria': 'off',
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/elements-content': 'off',
      '@angular-eslint/template/mouse-events-have-key-events': 'off',
      '@angular-eslint/template/label-has-associated-control': 'off',
      '@angular-eslint/template/alt-text': 'off',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
  },
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: {
      parser: require('jsonc-eslint-parser'),
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'off',
    },
  },
  {
    files: ['**/snippets/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
    },
  },
];
