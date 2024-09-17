module.exports = {
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)',
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/jest.setup.js'], // Add this line
  };
  