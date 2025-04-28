import express from "express";
import cors from "cors";
import { readData } from "./utils/readData.js";
import { writeData } from "./utils/writeData.js";
import { deleteData } from "./utils/deleteData.js";
import { updateData } from "./utils/updateData.js";

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/entries", async (req, res) => {
  const data = await readData();
  res
    .status(200)
    .json({ success: true, data: Array.isArray(data) ? data : [] });
});

app.post("/api/save-form", async (req, res) => {
  const newEntry = req.body;
  const existingData = await readData();
  await writeData(existingData, newEntry);
  res.status(201).json({ success: true, data: newEntry });
});

app.delete("/api/entries/:id", async (req, res) => {
  const { id } = req.params;
  await deleteData(id);
  res.status(200).json({ success: true });
});

app.put("/api/entries/:id", async (req, res) => {
  const { id } = req.params;
  const updatedEntryData = req.body;
  const updatedEntry = await updateData(id, updatedEntryData);
  res.status(200).json({ success: true, data: updatedEntry });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
import express from "express";
import cors from "cors";
import { readData } from "./utils/readData.js";
import { writeData } from "./utils/writeData.js";
import { deleteData } from "./utils/deleteData.js";
import { updateData } from "./utils/updateData.js";

// Configuration
const PORT = 3001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// API Endpoints
// GET
app.get("/api/entries", async (req, res) => {
  console.log("--- Received request for GET /api/entries ---");
  try {
    let data = [];
    try {
      data = await readData();
      if (!Array.isArray(data)) {
        console.warn(
          "readData did not return an array for GET /api/entries. Returning empty array."
        );
        data = [];
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(
          "Data file not found for GET /api/entries. Returning empty array."
        );
      } else if (error instanceof SyntaxError) {
        console.warn(
          `Invalid JSON encountered by readData for GET /api/entries. Returning empty array. Error: ${error.message}`
        );
      } else {
        throw error;
      }
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error processing GET /api/entries:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve entries." });
  }
});

// POST
app.post("/api/save-form", async (req, res) => {
  console.log("--- Received request for POST /api/save-form ---");
  const newEntry = req.body;

  if (
    !newEntry ||
    !newEntry.id ||
    !newEntry.firstName ||
    !newEntry.lastName ||
    !newEntry.email ||
    !newEntry.birthDate
  ) {
    console.log("Validation failed for new entry:", newEntry);
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  try {
    let existingData = [];
    try {
      existingData = await readData();
      if (!Array.isArray(existingData)) {
        console.warn(
          "readData did not return an array for POST /api/save-form. Initializing as empty array."
        );
        existingData = [];
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(
          "Data file not found by readData (POST). Initializing as empty array."
        );
      } else if (error instanceof SyntaxError) {
        console.warn(
          `Invalid JSON encountered by readData (POST). Initializing as empty array. Error: ${error.message}`
        );
      } else {
        throw error;
      }
    }

    if (existingData.some((entry) => entry.id === newEntry.id)) {
      console.log(`Attempted to add entry with duplicate ID: ${newEntry.id}`);
      return res.status(409).json({
        success: false,
        message: `Entry with ID ${newEntry.id} already exists.`,
      });
    }

    await writeData(existingData, newEntry);

    console.log("Data successfully saved for ID:", newEntry.id);
    res.status(201).json({ success: true, data: newEntry });
  } catch (error) {
    console.error("Error processing POST /api/save-form:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error saving data." });
  }
});

// DELETE
app.delete("/api/entries/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`--- Received request for DELETE /api/entries/${id} ---`);

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing entry ID." });
  }

  try {
    const deleted = await deleteData(id);
    if (deleted) {
      res
        .status(200)
        .json({ success: true, message: `Entry with ID ${id} deleted.` });
    } else {
      res
        .status(404)
        .json({ success: false, message: `Entry with ID ${id} not found.` });
    }
  } catch (error) {
    console.error(`Error processing DELETE /api/entries/${id}:`, error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error deleting data.",
    });
  }
});

// UPDATE
app.put("/api/entries/:id", async (req, res) => {
  const { id } = req.params;
  const updatedEntryData = req.body;
  console.log(`--- Received request for PUT /api/entries/${id} ---`);

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Missing entry ID in URL." });
  }

  if (
    !updatedEntryData ||
    !updatedEntryData.firstName ||
    !updatedEntryData.lastName ||
    !updatedEntryData.email ||
    !updatedEntryData.birthDate
  ) {
    console.log("Validation failed for updated entry data:", updatedEntryData);
    return res.status(400).json({
      success: false,
      message: "Missing required fields in request body.",
    });
  }

  if (updatedEntryData.id && updatedEntryData.id !== id) {
    return res.status(400).json({
      success: false,
      message: "Entry ID in body conflicts with URL ID.",
    });
  }

  try {
    const updatedEntry = await updateData(id, updatedEntryData);
    res.status(200).json({ success: true, data: updatedEntry });
  } catch (error) {
    console.error(`Error processing PUT /api/entries/${id}:`, error);
    if (error.message.includes("not found")) {
      res.status(404).json({ success: false, message: error.message });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error updating data.",
      });
    }
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


--------------------------------------------------------------------------------------------------------------------
OLD CODE
import express from "express";
import cors from "cors";
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
*/
