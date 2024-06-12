const mongoose = require("mongoose");

// Define the schema for the course model
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    }
});

// Create and export the Course model based on the schema
module.exports = mongoose.model("Course", courseSchema);
