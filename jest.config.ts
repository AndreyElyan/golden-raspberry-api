import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  rootDir: '.',
  collectCoverageFrom: [
    'src/**/*.{ts,js}', // Include all ts and js files
    '!src/**/*.spec.{ts,js}', // Exclude all test files
    '!src/**/*mock*.{ts,js}', // Exclude all mock files
    '!**/node_modules/**', // Exclude node_modules
    '!**/dist/**', // Exclude dist
    '!**/coverage/**', // Exclude coverage
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
