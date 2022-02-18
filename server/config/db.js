const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@longue404-cluster.spzyi.mongodb.net/Longue404"
    );
  } catch (error) {
    console.log("error connect db");
  }
};

module.exports = connectDb;
