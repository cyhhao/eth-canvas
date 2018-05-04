// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ['plugin:vue/essential'],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        // 'import/extensions': ['error', 'always', {
        //     js: 'never',
        //     vue: 'never'
        // }],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        // 'no-param-reassign': ['error', {
        //     props: true,
        //     ignorePropertyModificationsFor: [
        //         'state', // for vuex state
        //         'acc', // for reduce accumulators
        //         'e' // for e.returnvalue
        //     ],
        //
        // }],

        'semi': ['warn', 'never'],
        // 'indent': ['error', 4,{ "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }],
        // allow optionalDependencies
        // 'import/no-extraneous-dependencies': ['error', {
        //     optionalDependencies: ['test/unit/index.js']
        // }],
        // allow debugger during development
        // 'no-param-reassign':0,

        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'quote-props': [0, 'consistent-as-needed'],
        'no-lonely-if': 0,
        'dot-notation': 0,
        'no-unused-vars': 0,
        'no-nested-ternary': 0,
        'max-len': [1, 1200, 4],
        'no-extra-parens': 0,
        'camelcase': 0,

        'vue/no-parsing-error': [2, {'x-invalid-end-tag': false}],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
