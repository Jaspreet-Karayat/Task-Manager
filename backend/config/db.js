const mongoose = require("mongoose");
require('dotenv').config();

const URL = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
