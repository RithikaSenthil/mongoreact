require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const courseRoutes = require('./routes/CourseRoutes');

const app = express();
const PORT = process.env.PORT || 6006; // Change the port number if needed

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error("Could not connect to MongoDB Atlas", error));

// Routes
app.use("/api/courses", courseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
