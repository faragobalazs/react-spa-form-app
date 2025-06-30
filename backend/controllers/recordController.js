const Record = require("../models/record");
const EmailService = require("../emails/emailService");

// Get all records
exports.getAllRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single record
exports.getRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new record
exports.createRecord = async (req, res) => {
  const record = new Record(req.body);

  try {
    const newRecord = await record.save();

    // Send email notification (non-blocking)
    try {
      await EmailService.sendRecordCreatedEmail(newRecord);
    } catch (emailError) {
      console.error("Failed to send record created email:", emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a record
exports.updateRecord = async (req, res) => {
  try {
    const { firstName, lastName, email, birthDate } = req.body;

    if (!firstName || !lastName || !email || !birthDate) {
      return res
        .status(400)
        .json({ message: "Some required fields are missing" });
    }

    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a record
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    await record.deleteOne();
    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
