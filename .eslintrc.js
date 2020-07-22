module.exports = {
    env: {
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
                allowHigherOrderFunctions: true,
            },
        ],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-use-before-define': 0,
        'prefer-rest-params': 0,
        'prefer-spread': 0,
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
    },
};