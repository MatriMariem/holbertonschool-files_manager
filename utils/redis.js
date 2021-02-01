import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => {
      console.error(error);
    });
  }

  isAlive() {
    return this.client.connected;
  }
  /* eslint-disable */
  async get(key) {
    const val = await this.client.get(key, (err, val) => {
      if (err) { throw err; }
      return (val);
    });
    return val;
  }

  async set(key, val, dur) {
    this.client.set(key, val);
    this.client.expire(key, dur);
  }

  async del(key) {
    this.client.del(key, (err) => {
      if (err) { throw err; }
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
