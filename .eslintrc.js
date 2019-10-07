module.exports = {
    extends: ['airbnb', 'prettier', 'prettier/react'],
    plugins: ['prettier'],
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
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            },
        ],
    },
};
