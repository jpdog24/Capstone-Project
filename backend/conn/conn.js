// Importing the mongoose library which is used for interacting with MongoDB.
const mongoose = require("mongoose");
const conn = async () => {
  try {
  // Attempt to connect to MongoDB using the connection string stored in environment variable MONGO_URI.
    const response = await mongoose.connect(`${process.env.MONGO_URI}`);
    // If the connection is successful, log a message to the console.
    if (response) {
      console.log("connected to DB");
    }
  } catch (error) {

    // If there is an error during the connection process, log the error to the console.
    console.log(error);
  }
};

// Calling the 'conn' function to initiate the connection process to the database.
conn();
