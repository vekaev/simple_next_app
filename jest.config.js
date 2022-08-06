/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '@utils/(.*)': '<rootDir>/client/src/utils/$1',
    '@providers/(.*)': '<rootDir>/client/src/providers/$1',
    '@features/(.*)': '<rootDir>/client/src/features/$1',
    '@services/(.*)': '<rootDir>/client/src/services/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
