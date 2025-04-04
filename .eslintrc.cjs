/** @type {import("eslint").Linter.Config} */
const config = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'prettier',
    ],
    rules: {
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/consistent-type-definitions': 'off',

        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: { attributes: false },
            },
        ],
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off', // Warn b/c return types are not supported in Svelte markdown
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-empty-function': 'off', // OFF b/c we use empty functions a lot (esp. for initialization)
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/no-floating-promises': 'warn', // Warn b/c we have existing code in migration that I don't want to touch to pass new linting rules
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-inferrable-types': 'off', // OFF b/c this errors on some useful code annotations for function signatures
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'off', // OFF b/c used in Svelte components for UI logic
        '@typescript-eslint/no-unsafe-call': 'off', // OFF b/c used in Svelte components for UI logic
        '@typescript-eslint/no-unsafe-member-access': 'off', // OFF b/c there are simply too many linting errors
        '@typescript-eslint/no-unsafe-return': 'off', // OFF b/c used in Svelte components for UI logic
        '@typescript-eslint/unused-export-let': 'off', // OFF b/c used in Svelte components for UI logic
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/restrict-plus-operands': 'off', // OFF b/c not entirely accurate despite proper typings
        '@typescript-eslint/restrict-template-expressions': 'off', // OFF b/c using any is useful in template expressions
        '@typescript-eslint/unbound-method': 'error',

        // EsLint Rules
        'arrow-body-style': 'warn', // WARN b/c blocks style allows for readability and ensure scope
        'arrow-spacing': 'error',
        'eol-last': 'warn',
        eqeqeq: 'error',
        'func-call-spacing': 'error',
        indent: 'off', // OFF b/c causes problems between Prettier and ESLint
        'linebreak-style': 'off', // OFF b/c Windows (Git) puts CRLF line endings
        'missing-declaration': 'off', // OFF b/c throws errors on imports / require statements
        'multiline-ternary': 'off', // OFF b/c causes problems between Prettier and ESLint
        'no-alert': 'warn',
        'no-async-promise-executor': 'error',
        'no-case-declarations': 'error',
        'no-console': ['error', { allow: ['error', 'warn'] }],
        'no-control-regex': 'error',
        'no-dupe-keys': 'error',
        'no-empty': 'error',
        'no-extra-boolean-cast': 'error',
        'no-extra-parens': 'off', // OFF b/c reactive dependencies in .svelte files (mostly for errors)
        'no-extra-semi': 'error',
        'no-fallthrough': 'error',
        'no-import-assign': 'error',
        'no-irregular-whitespace': 'error',
        'no-prototype-builtins': 'error',
        'no-return-await': 'error',
        'no-trailing-spaces': 'error',
        'no-useless-escape': 'error',
        'no-undef': 'error',
        'no-underscore-dangle': 'off', // OFF b/c this syntax is used for defining local callback methods
        'no-unreachable': 'error',
        'no-unused-export-let': 'off', // OFF b/c troublesome with some .js files in packages/shared
        'no-unused-vars': 'off', // OFF b/c the typescript linter rule is used
        'no-var': 'error',
        'prefer-arrow-callback': 'warn',
        'prefer-const': 'warn',
        'prefer-destructuring': 'off', // OFF b/c it's not really correct
        quotes: ['error', 'single'],
        semi: 'off', // OFF b/c we aren't using semicolons
        'space-before-function-paren': 'off', // OFF b/c we aren't using spaces before function parameters / signatures
        'spaced-comment': 'error',
    },
}

module.exports = config
