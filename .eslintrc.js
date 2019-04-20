module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/max-attributes-per-line": ["error", {
      "singleline": 10,
      "multiline": {
        "max": 10,
        "allowFirstLine": true
      }
    }],
    "vue/attributes-order": 0,
    "vue/mustache-interpolation-spacing": 0,
    "vue/html-self-closing": 0
  }
}
