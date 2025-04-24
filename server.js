import express from "express";
import fs from "fs/promises";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// Configuration
const PORT = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "formData.json");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Helper Function
const ensureDataDirExists = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } else {
      throw error;
    }
  }
};

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
    return res.status(400).json({ success: false });
  }

  try {
    await ensureDataDirExists();
    let existingData = [];

    // Read existing data
    try {
      const fileContent = await fs.readFile(DATA_FILE, "utf-8");
      if (fileContent.trim() === "") {
        console.log(
          `Data file (${DATA_FILE}) is empty. Initializing as empty array.`
        );
        existingData = [];
      } else {
        const parsedData = JSON.parse(fileContent);
        if (Array.isArray(parsedData)) {
          existingData = parsedData;
        } else {
          console.warn(
            `Data file (${DATA_FILE}) does not contain a valid JSON array. Initializing as empty array.`
          );
          existingData = [];
        }
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(
          `Data file (${DATA_FILE}) not found. Initializing as empty array.`
        );
      } else if (error instanceof SyntaxError) {
        console.warn(
          `Invalid JSON in data file (${DATA_FILE}). Initializing as empty array. Error: ${error.message}`
        );
      } else {
        throw error;
      }
    }

    // Add new entry
    existingData.push(newEntry);

    // Write updated data back to the file
    await fs.writeFile(
      DATA_FILE,
      JSON.stringify(existingData, null, 2),
      "utf-8"
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
