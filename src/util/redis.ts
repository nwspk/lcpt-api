import * as redis from 'redis';

import { config } from 'src/config';

export const redisClient = redis.createClient(config.redis.url);
