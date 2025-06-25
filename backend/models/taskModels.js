const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: String,
  date: { type: Date, default: Date.now },
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  skillLevel: { type: String, enum: ["beginner", "intermediate", "advanced"] },
  postedBy: String,
  claimed: { type: Boolean, default: false },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
