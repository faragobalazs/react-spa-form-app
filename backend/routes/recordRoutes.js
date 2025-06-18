const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");

// GET all records
router.get("/", recordController.getAllRecords);

// GET single record
router.get("/:id", recordController.getRecord);

// POST new record
router.post("/", recordController.createRecord);

// PUT update record
router.put("/:id", recordController.updateRecord);

// DELETE record
router.delete("/:id", recordController.deleteRecord);

module.exports = router;
