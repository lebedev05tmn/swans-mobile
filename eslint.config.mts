import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    { files: ['/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { ignores: ['node_modules', 'dist'] },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat!.recommended,
    prettierConfig,
    {
        plugins: ['prettier', '@typescript-eslint'],
        rules: {
            'prettier/prettier': 'error',
            'space-before-blocks': 'error',
            'keyword-spacing': [
                'error',
                {
                    before: true,
                    after: true,
                },
            ],
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'always',
                    named: 'always',
                    asyncArrow: 'always',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
];