const mongoose = require("mongoose");

async function dbconnection() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/mystore");
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error:", error);
    }
}

module.exports = dbconnection;
