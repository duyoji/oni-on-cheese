import redis from 'redis';
import bluebird from 'bluebird';
import dotenv from 'dotenv';

// Read .env and set values into process.env.
dotenv.config();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client = null;
let isConnecting = false;
// Singleton pattern.
const getRedisClient = () => {
  if (client && isConnecting) {
    return client;
  }

  client = redis.createClient({
    url: process.env.REDIS_URL
  });
  isConnecting = true;

  client.on('end', function () {
    client = null;
    isConnecting = false;
  });

  return client;
};


export { getRedisClient };