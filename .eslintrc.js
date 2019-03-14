module.exports = {
  env: {
    browser: true
  },
  extends: [
      'plugin:security/recommended',
      'plugin:vue/essential',
      '@vue/standard'
  ],
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error'
    ],
    quotes: [
      'error',
      'single'
    ],
    'no-trailing-spaces': [
      'error'
    ],
    'symbol-description': [
      'warn'
    ]
  },
  parserOptions: {
    sourceType: 'module'
  }
};
