// Import the mongoose library which is used to interact with MongoDB

const mongoose = require("mongoose");

// Define a new schema for a Task using Mongoose
const TaskSchema = new mongoose.Schema(
  {

    // Title of the task
    title: {
      type: String, // The type of this field is String
      required: true,  // This field is required
      unique: true,   // This field must be unique across all tasks
    },

    // Description of the task
    desc: {
      type: String,
      required: true,
      unique: true,
    },

    // Indicates if the task is important
    important: {
      type: Boolean,
      default: false, // If not specified, it defaults to false
    },
    complete: {
      type: Boolean,
      default: false, // If not specified, it defaults to false
    },
  },
  { timestamps: true }    // Automatically add createdAt and updatedAt fields
);

// Export the Task model based on the TaskSchema for use in other parts of the application
module.exports = mongoose.model("task", TaskSchema);
