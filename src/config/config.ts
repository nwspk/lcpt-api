import 'dotenv/config'
import convict from 'convict'

import { redisDefault } from './redis'

export enum Env {
  Test = 'test',
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

export enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

import { values as _values } from 'lodash'

const convictConfig = convict({
  app: {
    env: {
      doc: 'The current environment of the app',
      format: String,
      default: Env.Development,
      env: 'NODE_ENV',
    },
    name: {
      doc: 'The name of the current server instance for handling loggers',
      format: String,
      default: 'lcpt API',
      env: 'API_NAME',
    },
    host: {
      doc: 'The host on which the server should run.',
      format: String,
      default: 'localhost',
      env: 'HOST',
    },
    port: {
      doc: 'The port on which the server should run.',
      format: 'port',
      default: 12180,
      env: 'PORT',
    },
    logLevel: {
      doc: 'Logging level, can be log, console, warn, error, info',
      format: String,
      default: LogLevel.Error,
      env: 'LOG_LEVEL',
    },
  },
  redis: {
    url: {
      doc: 'Redis url',
      format: String,
      default: redisDefault,
      env: 'REDIS_URL',
    },
  },
  twilio: {
    SID: {
      format: String,
      default: null,
      env: 'TWILIO_SID',
    },
    SERVICE_ID: {
      format: String,
      default: null,
      env: 'TWILIO_SERVICE_ID',
    },
    TOKEN: {
      format: String,
      default: null,
      env: 'TWILIO_TOKEN',
    },
  },
  // mailgun: {
  //   apiKey: {
  //     doc: 'Mailgun api key',
  //     format: String,
  //     default: null,
  //     env: 'MAILGUN_API_KEY',
  //     sensitive: true,
  //   },
  //   domain: {
  //     doc: 'Mailgun domain',
  //     format: String,
  //     default: 'mailgun.getlcpt.com',
  //     env: 'MAILGUN_DOMAIN',
  //   },
  // },
})

export { convictConfig }
