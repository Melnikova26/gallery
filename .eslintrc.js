module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended-type-checked',
      'plugin:@typescript-eslint/stylistic-type-checked',
      'prettier',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'prettier/prettier': 'warn',
    },
};
