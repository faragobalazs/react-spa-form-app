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

app.get("/api/entries/:id", async (req, res) => {
  const { id } = req.params;
  const data = await readData();
  const entry = data.find((entry) => entry.id === id);
  res.status(200).json({ success: true, data: entry });
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
