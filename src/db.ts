import 'reflect-metadata'
import {
    createConnection as _createConnection,
    getConnection as _getConnection,
    Connection as TypeormConnection,
    ConnectionOptions,
} from 'typeorm'

import { postgresDefault, postgresConfig } from 'src/config/db'
import User from './models/User.model'
import Campus from './models/Campus.model'
import Application from './models/Application.model'

const url = process.env.DATABASE_URL || postgresDefault

const connectOptions = (): ConnectionOptions => ({
    type: 'postgres',
    url,
    synchronize: false,
    logging: false,
    entities: [
        User,
        Campus,
        Application
    ],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
    extra: {
        ssl: postgresConfig.get('useSsl'),
    },
})

export interface Connection extends TypeormConnection { }

export async function createConnection() {
    let connection: Connection
    try {
        connection = await _getConnection()
        return connection
    } catch (e) {
        // We ignore since its likely that it caused because there was no connection
    }
    try {
        connection = await _createConnection(connectOptions())
        return connection
    } catch (e) {
        console.error(e)
        // Logger.error(e)
        throw e
    }
}
