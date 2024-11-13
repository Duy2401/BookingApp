const connectRedis = require('./redisDB');

const setValue = async (key, value) => {
  const redisClient = connectRedis();
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    console.log('Setting key:', key, 'with value:', JSON.stringify(value));
    await redisClient.set(key, JSON.stringify(value));
    console.log('Value set in Redis successfully');
  } catch (error) {
    console.error('Error setting value in Redis:', error);
  } finally {
    await redisClient.quit();
  }
};

const getValue = async (key) => {
  const redisClient = connectRedis();
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    const value = await redisClient.get(key);
    console.log('Value retrieved from Redis:', value);
    return JSON.parse(value);
  } catch (error) {
    console.error('Error getting value from Redis:', error);
  } finally {
    await redisClient.quit();
  }
};

const DelTokeLogout = async (key) => {
  const redisClient = connectRedis();
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    await redisClient.del(key);
    console.log('Delete Token is Successfully');
  } catch (error) {
    console.error('Error deleting value in Redis:', error);
  } finally {
    await redisClient.quit();
  }
};

module.exports = { setValue, getValue, DelTokeLogout };
