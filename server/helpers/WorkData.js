const RedisClient = require("../helpers/redisDB");

async function setValue(key, value) {
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
    return console.log(`Value set in Redis: ${key} -> ${value}`);
  } catch (error) {
    console.error("Error setting value in Redis:", error);
  } finally {
    await redisClient.quit();
  }
}

module.exports = { setValue };
