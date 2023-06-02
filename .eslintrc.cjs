module.exports = {
    root: true,
    env: {
        es2022: true,
        node: true,
    },
    plugins: ["@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.eslint.json"],
    },
    ignorePatterns: ["*.*", "!src/**/*", "!test/**/*", "!example/**/*"],
    'rules': {
        'semi': 'off',
        'quotes': ['warn', 'single'],
        'eqeqeq': ['error', 'always', {
            'null': 'ignore'
        }],
        'no-unsafe-optional-chaining': ['error', {
            'disallowArithmeticOperators': true
        }],
        "@typescript-eslint/semi": ["warn", "always"],
        "@typescript-eslint/member-delimiter-style": ["warn", {
            "multiline": {
                "delimiter": "semi",
                "requireLast": true
            },
            "singleline": {
                "delimiter": "comma",
                "requireLast": false
            },
            "overrides": {
                "interface": {
                    "multiline": {
                        "delimiter": "semi",
                        "requireLast": true
                    }
                }
            }

        }],
        '@typescript-eslint/no-floating-promises': ['error', {
            'ignoreVoid': false,
            'ignoreIIFE': false
        }],
        '@typescript-eslint/no-misused-promises': ['error', {
            'checksVoidReturn': false
        }],
        '@typescript-eslint/await-thenable': ['error'],
        '@typescript-eslint/consistent-type-imports': ['warn', {
            'prefer': 'type-imports'
        }],
        '@typescript-eslint/consistent-type-exports': ['warn', {
            'fixMixedExportsWithInlineTypeSpecifier': true
        }],
        '@typescript-eslint/explicit-member-accessibility': ['warn', {
            'accessibility': 'explicit',
            'overrides': {
                'constructors': 'off'
            }
        }]
    }
};