// Load environment variables
require("dotenv").config();

// Import express-async-errors early to patch Express
require("express-async-errors");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recordRoutes = require("./routes/recordRoutes");
const emailRoutes = require("./routes/emailRoutes");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("MONGO_URL environment variable is required");
  process.exit(1);
}

console.log("Connecting to MongoDB:", MONGO_URL);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/records", recordRoutes);
app.use("/api/emails", emailRoutes);

// 404 handler - must be before error handler
app.use(notFound);

// Error handling middleware - must be last
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
