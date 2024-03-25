module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom', // Make sure the test environment is set to 'jsdom'
  };
  