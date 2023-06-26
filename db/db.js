require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log("MongoDB connected", process.env.MONGODB_URI);
  } catch (error) {
    console.log('MongoDB error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

