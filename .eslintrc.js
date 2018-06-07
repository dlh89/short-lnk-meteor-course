module.exports = {
  extends: 'airbnb-base',
  plugins: ['eslint-plugin-react'],
  parser: 'babel-eslint',
  rules: {
    'linebreak-style': ['error', 'windows'],
    'react/jsx-filename-extension': 0,
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'no-unused-vars': ['error', { vars: 'local', args: 'none' }],
    'func-names': ['error', 'never'],
  },
};
