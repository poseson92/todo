const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  title: String,
  checkbox: false,
  description: String,
  createdBy: String,
  createAt: { type: Date, default: Date.now() },
});

module.exports = toDo = mongoose.model("ToDo", ToDoSchema);
