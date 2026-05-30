import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser }
    },
    pluginReact.configs.flat.recommended,
    {
        rules: {
            // turns off obsolete React 16 rule, React 17 has JSX transform
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off'
        }
    }
]);
