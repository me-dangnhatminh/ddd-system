import type { Config } from 'jest';
const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  moduleNameMapper: {
    '^@common': '<rootDir>/src/common',
    '^@modules/auth': '<rootDir>/src/modules/auth',
    '^@infrastructure': '<rootDir>/src/infrastructure',
  },
};

export default config;
