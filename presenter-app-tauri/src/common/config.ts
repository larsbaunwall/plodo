export interface AppConfig {
  apiEndpoint: string
  apiVersion: string
  streamEndpoint: string
}

const development: AppConfig = {
  apiEndpoint: 'https://api.plodo.io',
  apiVersion: 'v1',
  streamEndpoint: 'https://api.plodo.io/session-stream',
}

const production: AppConfig = {
  apiEndpoint: 'https://api.plodo.io',
  apiVersion: 'v1',
  streamEndpoint: 'https://api.plodo.io/session-stream',
}

const isProd = (import.meta as any).env ? (import.meta as any).env.PROD : false
export const config = isProd ? production : development
