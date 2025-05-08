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

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
    message: err.message,
  });
});

app.get("/api/entries", async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json({
      success: true,
      data: Array.isArray(data) ? data : [],
    });
  } catch (error) {
    console.error("Error reading entries:", error);
    res.status(500).json({
      success: false,
      error: "Failed to read entries",
      message: error.message,
    });
  }
});

app.get("/api/entries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readData();
    const entry = data.find((entry) => entry.id === id);
    if (!entry) {
      return res.status(404).json({
        success: false,
        error: "Entry not found",
      });
    }
    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    console.error("Error reading entry:", error);
    res.status(500).json({
      success: false,
      error: "Failed to read entry",
      message: error.message,
    });
  }
});

app.post("/api/save-form", async (req, res) => {
  try {
    const newEntry = req.body;
    const existingData = await readData();
    await writeData(existingData, newEntry);
    res.status(201).json({ success: true, data: newEntry });
  } catch (error) {
    console.error("Error saving entry:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save entry",
      message: error.message,
    });
  }
});

app.delete("/api/entries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteData(id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete entry",
      message: error.message,
    });
  }
});

app.put("/api/entries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEntryData = req.body;
    const updatedEntry = await updateData(id, updatedEntryData);
    if (!updatedEntry) {
      return res.status(404).json({
        success: false,
        error: "Entry not found",
      });
    }
    res.status(200).json({ success: true, data: updatedEntry });
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update entry",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
