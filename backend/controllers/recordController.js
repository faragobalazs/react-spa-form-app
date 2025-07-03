const Record = require("../models/record");
const EmailService = require("../emails/emailService");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

// Get all records
exports.getAllRecords = async (req, res) => {
  const records = await Record.find().sort({ createdAt: -1 });
  res.json(records);
};

// Get a single record
exports.getRecord = async (req, res) => {
  const record = await Record.findById(req.params.id);

  if (!record) {
    throw new NotFoundError("Record not found");
  }

  res.json(record);
};

// Create a new record
exports.createRecord = async (req, res) => {
  const record = new Record(req.body);
  const newRecord = await record.save();

  // Send email notification (non-blocking)
  try {
    await EmailService.sendRecordCreatedEmail(newRecord);
  } catch (emailError) {
    console.error("Failed to send record created email:", emailError);
    // Don't fail the request if email fails
  }

  res.status(StatusCodes.CREATED).json(newRecord);
};

// Update a record
exports.updateRecord = async (req, res) => {
  const { firstName, lastName, email, birthDate } = req.body;

  if (!firstName || !lastName || !email || !birthDate) {
    throw new BadRequestError("Some required fields are missing");
  }

  const updatedRecord = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedRecord) {
    throw new NotFoundError("Record not found");
  }

  res.json(updatedRecord);
};

// Delete a record
exports.deleteRecord = async (req, res) => {
  const record = await Record.findById(req.params.id);

  if (!record) {
    throw new NotFoundError("Record not found");
  }

  await record.deleteOne();
  res.json({ message: "Record deleted" });
};
