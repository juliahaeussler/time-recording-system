require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect('mongodb+srv://adminbhaeussler:sHbfEvYDQQbret24@cluster0.jdcoi.mongodb.net/bhaeussler?retryWrites=true&w=majority', {
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

