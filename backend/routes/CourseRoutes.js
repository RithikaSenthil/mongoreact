const express = require("express");
const router = express.Router();
const { getCourses, saveCourse, updateCourse, deleteCourse } = require("../controllers/CourseController");

// Define routes for course operations
router.get('/', getCourses);
router.post('/', saveCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
