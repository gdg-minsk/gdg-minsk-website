module.exports = {
    extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
    globals: {
        window: true,
        document: true,
        localStorage: true,
        FormData: true,
        FileReader: true,
        Blob: true,
        navigator: true,
    },
    parser: 'babel-eslint',
    rules: {
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx'],
            },
        ],
        'import/imports-first': ['error', 'absolute-first'],
        'import/newline-after-import': 'error',
        'max-len': [
            'error',
            120,
            {
                ignoreStrings: true,
                ignoreRegExpLiterals: true,
            },
        ],
        'react/jsx-props-no-spreading': 0,
        'react/no-array-index-key': 0,
        'import/prefer-default-export': 0,
    },
};
