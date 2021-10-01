module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb-typescript',
    '@react-native-community',
    'eslint-config-silence',
    'silence/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'import', 'reanimated'],
  ignorePatterns: ['__oldSrc/**', '/**/*.d.ts'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'global-require': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-shadow': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'max-len': ['error', { code: 150 }],
    '@typescript-eslint/no-use-before-define': ['warn', { variables: false }],
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': 0,
    "react-hooks/exhaustive-deps": 'off'
  },
};
