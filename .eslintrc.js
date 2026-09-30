module.exports = {
  root: true,
  extends: ['backpacker-react-ts'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  overrides: [
    {
      files: ['jest/**/*.{js,jsx,ts,tsx}'],
      parserOptions: {
        project: ['./jest/tsconfig.json']
      }
    }
  ]
};
