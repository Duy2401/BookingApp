const redis = require('redis');

const connectRedis = () => {
  const client = redis.createClient({
    host: '121e4b4c1910',
    port: 6379,
  });

  client.on('connect', () => {
    console.log('Redis client connected');
  });

  client.on('error', (err) => {
    console.error('Redis connection error:', err);
  });

  return client;
};

module.exports = connectRedis;
