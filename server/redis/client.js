import redis from 'redis';
import bluebird from 'bluebird';
import dotenv from 'dotenv';

const result = dotenv.config()
// if (result.error) {
//   throw result.error;
// }

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client;
if (process.env.NODE_ENV === 'production') {
  client = redis.createClient({
    url: process.env.REDIS_URI
  });
} else {
  client = redis.createClient();
}

export default client;