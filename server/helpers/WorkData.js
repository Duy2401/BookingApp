const RedisClient = require("../helpers/redisDB");

async function setValue(key, value) {
  const options = {
    password: process.env.KEY_PASSWORD,
    socket: {
      host: process.env.KEY_HOST,
      port: process.env.KEY_PORT,
    },
  };
  const redisClient = new RedisClient(options);
  await redisClient.connect();

  try {
    await redisClient.set(key, JSON.stringify(value));
    return console.log(`Value set in Redis: ${key} -> ${value}`);
  } catch (error) {
    console.error("Error setting value in Redis:", error);
  } finally {
    await redisClient.quit();
  }
}

module.exports = { setValue };
