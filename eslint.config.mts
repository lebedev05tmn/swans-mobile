import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        ignores: ['node_modules', 'dist', 'build'],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,

    {
        plugins: {
            react: reactPlugin,
            prettier: prettierPlugin,
            '@typescript-eslint': tseslint.plugin,
        },
        rules: {
            // Prettier
            'prettier/prettier': 'error',

            // TypeScript
            '@typescript-eslint/no-explicit-any': 'error',

            // React
            'react/jsx-uses-react': 'warn',
            'react/jsx-uses-vars': 'warn',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',

            // Style
            'space-before-blocks': 'error',
            'keyword-spacing': ['error', { before: true, after: true }],
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'always',
                    named: 'always',
                    asyncArrow: 'always',
                },
            ],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
