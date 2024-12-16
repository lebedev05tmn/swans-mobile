import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    { files: ['/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    { ignores: ['node_modules', 'dist'] },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat!.recommended,
    prettierConfig,
    {
        plugins: ['prettier'],
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
        },
    },
];
