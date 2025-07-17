import Redis from "ioredis";

const connectRedis = () => {
  const redisHost = process.env.REDIS_HOST;
  const redisPort = process.env.REDIS_PORT;

  // Validate the environment variables
  if (!redisHost || !redisPort) {
    console.error("REDIS_HOST or REDIS_PORT is missing in the .env file.");
    process.exit(1); // Exit if Redis configuration is missing
  }

  // Ensure the port is a valid number
  const port = Number(redisPort);
  if (isNaN(port) || port < 0 || port > 65535) {
    console.error("Invalid REDIS_PORT value:", redisPort);
    process.exit(1); // Exit if port is invalid
  }

  const redis = new Redis({
    host: redisHost,
    port: port,
  });

  redis.on("connect", () => {
    console.log("Connected to Redis successfully.");
  });

  redis.on("error", (err) => {
    console.error("Redis connection error:", err);
    process.exit(1); // Exit the process if Redis can't connect
  });

  return redis;
};

const redisClient = connectRedis();
export default redisClient;
