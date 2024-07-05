const redis = require("redis");

function connectRedis() {
  const client = redis.createClient({
    password: process.env.KEY_PASSWORD,
    socket: {
      host: process.env.KEY_HOST,
      port: process.env.KEY_PORT,
    },
  });

  client.on("connect", () => {
    console.log("Client connected to redis...");
  });

  client.on("ready", () => {
    console.log("Client connected to redis and ready to use...");
  });

  client.on("error", (err) => {
    console.log(err.message);
  });

  client.on("end", () => {
    console.log("Client disconnected from redis");
  });

  process.on("SIGINT", () => {
    client.quit();
  });

  return client;
}

module.exports = connectRedis;
