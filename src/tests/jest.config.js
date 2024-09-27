module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  forceExit: true,
  testTimeout: 60000,
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};