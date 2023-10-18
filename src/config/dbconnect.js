const mongoose = require("mongoose");
const app = require("../../app");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING);
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas");
  }
};

module.exports = connectToDatabase;
