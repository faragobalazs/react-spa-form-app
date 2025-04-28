import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { readData } from "./utils/readData.js";
import { writeData } from "./utils/writeData.js";

// Configuration
const PORT = 3001;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoint to Save Form Data
app.post("/api/save-form", async (req, res) => {
  console.log("--- Received request for /api/save-form ---");
  const newEntry = req.body;

  // Basic validation
  if (
    !newEntry ||
    !newEntry.id ||
    !newEntry.firstName ||
    !newEntry.lastName ||
    !newEntry.email ||
    !newEntry.birthDate
  ) {
    console.log("Validation failed for:", newEntry);
    return res.status(400).json({ success: false });
  }

  try {
    let existingData = [];
    existingData = await readData();
    await writeData(existingData, newEntry);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error processing /api/save-form:", error); // More specific error log
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
