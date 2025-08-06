export interface ApiConfig {
  apiEndpoint: string;
  apiVersion: string;
  streamEndpoint: string;
}

const isDevelopment = import.meta.env.MODE === 'development';

export const apiConfig: ApiConfig = isDevelopment
  ? {
      apiEndpoint: "https://api-qa.plodo.io",
      apiVersion: "v1",
      streamEndpoint: "https://qa-plodo.azurewebsites.net/session-stream"
    }
  : {
      apiEndpoint: "https://api.plodo.io",
      apiVersion: "v1",
      streamEndpoint: "https://prod-plodo-eus2.azurewebsites.net/session-stream"
    };
