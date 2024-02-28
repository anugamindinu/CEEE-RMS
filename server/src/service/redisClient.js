const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  // Redis server address (default is localhost)
  host: 'localhost',
  // Redis server port (default is 6379)
  port: 6379,
});

// Handle errors
redisClient.on('error', (error) => {
  console.error('Error connecting to Redis:', error);
});

module.exports = redisClient;
