export default {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.html'
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  verbose: true,
  transform: {}
};
