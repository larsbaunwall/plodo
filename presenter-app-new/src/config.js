// Configuration for different environments
const configs = {
  development: {
    apiEndpoint: 'https://www.plodo.io/api',
    apiVersion: 'v1',
    streamEndpoint: 'https://www.plodo.io/api/v1/stream'
  },
  production: {
    apiEndpoint: 'https://www.plodo.io/api',
    apiVersion: 'v1',
    streamEndpoint: 'https://www.plodo.io/api/v1/stream'
  }
};

// Determine which config to use
const env = import.meta.env.MODE || 'development';
const config = configs[env];

export default config;