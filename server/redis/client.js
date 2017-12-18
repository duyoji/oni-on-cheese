import redis from 'redis';
import bluebird from 'bluebird';
import dotenv from 'dotenv';

// Read .env and set values into process.env.
dotenv.config();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
  url: process.env.REDIS_URL
});

export default client;