import { convictConfig, LogLevel, Env } from './config'

export * from './config'

convictConfig.validate({ allowed: 'strict' })
export const config: Config = convictConfig.get()

export interface Config {
  app: {
    env: Env
    name: string
    host: string
    port: number
    logLevel: LogLevel
  }
  redis: {
    url: string
  }
  twilio: {
    SID: string
    SERVICE_ID: string
    TOKEN: string
  }
  // mailgun: {
  //   apiKey: string
  //   domain: string
  // }
}
