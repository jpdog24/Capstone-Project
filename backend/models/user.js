// Import the Mongoose library, which is used for interacting with MongoDB
const mongoose = require("mongoose");

// Define a schema for the user using Mongoose's Schema constructor
// This schema shows the structure of the user documents in the database
const userSchema = new mongoose.Schema({

  // Define the 'username' field
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Types.ObjectId,  // Each task will be stored as an ObjectId
      ref: "task",
    },
  ],
});

// Export the 'user' model based on the userSchema so it can be used in other files
module.exports = mongoose.model("user", userSchema);
