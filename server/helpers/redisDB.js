const redis = require("redis");

function connectRedis(options) {
  const client = redis.createClient(options);

  client.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  client.on("ready", () => {
    console.log("Connected to Redis server");
  });

  process.on("SIGINT", () => {
    client.quit();
  });
  client.connect();

  return client;
}

module.exports = connectRedis;
