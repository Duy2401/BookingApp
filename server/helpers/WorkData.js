const RedisClient = require("../helpers/redisDB");

const setValue = async (key, value) => {
  const redisClient = new RedisClient({
    password: process.env.KEY_PASSWORD,
    socket: {
      host: process.env.KEY_HOST,
      port: process.env.KEY_PORT,
    },
  });
  try {
    if (!redisClient.isConnected) {
      // Check connection status
      await redisClient.connect();
    }
    await redisClient.SET(key, JSON.stringify(value));
    return console.log("Value set in Redis successfully");
  } catch (error) {
    console.error("Error setting value in Redis:", error);
  } finally {
    await redisClient.quit();
  }
};
const getValue = async (key) => {
  const redisClient = new RedisClient({
    password: process.env.KEY_PASSWORD,
    socket: {
      host: process.env.KEY_HOST,
      port: process.env.KEY_PORT,
    },
  });
  try {
    if (!redisClient.isConnected) {
      // Check connection status
      await redisClient.connect();
    }
    const value = await redisClient.GET(key);
    const refreshToken = JSON.parse(value);
    return refreshToken;
  } catch (error) {
    console.error("Error setting value in Redis:", error);
    return null;
  } finally {
    await redisClient.quit();
  }
};

const DelTokeLogout = async (key) => {
  const redisClient = new RedisClient({
    password: process.env.KEY_PASSWORD,
    socket: {
      host: process.env.KEY_HOST,
      port: process.env.KEY_PORT,
    },
  });
  try {
    if (!redisClient.isConnected) {
      // Check connection status
      await redisClient.connect();
    }
    await redisClient.DEL(key);
    return console.log("Delete Toke is Successfully");
  } catch (error) {
    console.error("Error setting value in Redis:", error);
    return null;
  } finally {
    await redisClient.quit();
  }
};

module.exports = { setValue, getValue, DelTokeLogout };
