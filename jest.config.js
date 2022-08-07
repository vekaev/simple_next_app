/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFiles: [
    '<rootDir>/.jest/setEnvVars.js',
    '<rootDir>/.jest/browserMocks.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/.jest/jest.setup.js'],
  moduleNameMapper: {
    '@utils/(.*)': '<rootDir>/client/src/utils/$1',
    '@providers/(.*)': '<rootDir>/client/src/providers/$1',
    '@features/(.*)': '<rootDir>/client/src/features/$1',
    '@services/(.*)': '<rootDir>/client/src/services/$1',
    '@components/(.*)': '<rootDir>/client/src/components/$1',
    '@components': '<rootDir>/client/src/components',
    '@hooks/(.*)': '<rootDir>/client/src/hooks/$1',
    '@__mocks__/(.*)': '<rootDir>/client/src/__mocks__/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
