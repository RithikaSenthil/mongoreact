const Course = require("../models/CourseModel");

// Controller functions for handling course operations

// Get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ courses });
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses", error });
    }
};

// Add a new course
exports.saveCourse = async (req, res) => {
    const { title, description, duration } = req.body;
    try {
        const newCourse = new Course({ title, description, duration });
        const savedCourse = await newCourse.save();
        res.json({ message: "Course added successfully", course: savedCourse });
    } catch (error) {
        res.status(500).json({ message: "Error adding course", error });
    }
};

// Update an existing course
exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, duration } = req.body;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, { title, description, duration }, { new: true });
        res.json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: "Error updating course", error });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        await Course.findByIdAndDelete(id);
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting course", error });
    }
};
