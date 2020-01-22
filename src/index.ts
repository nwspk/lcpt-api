import 'reflect-metadata'
import express from 'express'
import logger from 'morgan'

import * as bodyParser from 'body-parser'

import cors from 'cors'

import router from './routes'
import { expressSmsAuth } from 'express-sms-auth';

import session from 'express-session';
import connectRedis = require('connect-redis');
import { redisClient } from './util/redis';

import { createConnection } from './db'
import User from './models/User.model'
import { config } from './config'
import { passport, clearSessionOnError } from './util/auth';

const app = express()

app.use(logger('tiny'))

app.use(
    cors({
        allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
        origin: [
            'http://lcpt.local:8080',
            'http://127.0.0.1:8080',
            'http://localhost:3000',
            'http://localhost:3001',
        ],
        credentials: true,
    })
)

// app.set('trust proxy', 1);

app.use(function (req, res, next) {
    if (req.headers['x-arr-ssl'] && !req.headers['x-forwarded-proto']) {
        req.headers['x-forwarded-proto'] = 'https';
    }
    return next();
});

const RedisStore = connectRedis(session);

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'lcpt-secret',
    resave: true,
    proxy: true,
    cookie: {
        // secure: config.app.env === Env.Production,
        // maxAge: 5184000000, // 2 months
    },
}));

app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());
app.use(clearSessionOnError); // for passport deserialization failures

app.get('/', (req, res) => {
    res.send({});
})

app.get('/logout', (req, res) => {
    req.logout();
    res.send({});
});

app.use(express.static('public'));


app.use('/', expressSmsAuth(
    async function (verification: any, req: any, res: any) {
        const { phone } = req.body;
        const user = await User.findOneOrFail({ phoneNumber: phone });
        console.log(user);
        req.login(user, (err: any) => {
            if (err) {
                console.error(`Failed to log user in:`, err);
                res.status(500).send({ error: true });
            } else {
                res.send({ user });
            }
        });
    },
    {
        twilioSid: config.twilio.SID,
        twilioToken: config.twilio.TOKEN,
        twilioServiceId: config.twilio.SERVICE_ID
    },
    ['+447480833086']
));

app.use('/', router)

    ; (async () => {
        const port = process.env.PORT || 12180
        await createConnection()
        app.listen(port)
        console.log('listening on port', port)
    })().catch(e => console.error(e.stack))
