// const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require("../database");

// crm routes
const courseRoutes = require("./routes/courseRoutes");

// rms routes
const refereesRoutes = require("./routes/refereesRoutes");
const refStatusRoutes = require("./routes/refStatusRoutes");
const referralRoutes = require("./routes/referralRoutes");

// middlewares
const requireAuth = require("./middleware/requireAuth");
const logFunctionExecution = require("./middleware/log");
const socketIo = require('socket.io');
process.env.TZ = 'Asia/Colombo'

const app = express();
app.use(cors());

const port = 8080;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDatabase();

// Set up your routes here
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, world CEEE!");
});

// middleware to handle logging of function execution
app.use(logFunctionExecution);

// Apply requireAuth middleware globally for all routes
app.use((req, res, next) => {
  // Define paths that should be excluded from authentication
  const excludedPaths = [
    "/api/referral/login",
    "/api/referral/verifyCode",
    "/api/referral/login",
    "/api/referral/referees/add-new",
    "/api/referral/verifyCode",
  ];

  // Check if the current request path is in the excluded paths
  if (excludedPaths.includes(req.path)) {
    return next(); // Skip authentication for excluded paths
  }
  
  // For all other paths, require authentication
  requireAuth(req, res, next);
});

// Use the student routes
app.use("/api", courseRoutes);

// use rms routes
app.use("/api/referral", refereesRoutes);
app.use("/api/referral", refStatusRoutes);
app.use("/api/referral", referralRoutes);

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "../server.key")),
  cert: fs.readFileSync(path.join(__dirname, "../server.cert")),
};

// Create an HTTP server and listen on the specified port
const server = https.createServer(httpsOptions, app);
const io = socketIo(server,{
  transports: ['polling'],
  cors: { origin: ['https://localhost:3000','http://localhost:3000','http://localhost','http://localhost/build/'] }
});

const { initializeSocket } = require('./service/notification');
initializeSocket(io);
server.listen(port, () => {
  console.log(new Date().toLocaleString());
  console.log(`Server running at https://localhost:${port}/`);
});