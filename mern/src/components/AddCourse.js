import React, { useState, useEffect } from "react";
import axios from "axios";
import './AddCourse.css';

function AddCourse() {
    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:6006/api/courses");
            setCourses(response.data.courses);
        } catch (error) {
            console.error("Error fetching courses: ", error);
        }
    };

    const addCourse = async () => {
        try {
            await axios.post("http://localhost:6006/api/courses", { title, description, duration });
            fetchCourses();
            setTitle("");
            setDescription("");
            setDuration("");
        } catch (error) {
            console.error("Error adding course: ", error);
        }
    };

    const deleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:6006/api/courses/${id}`);
            fetchCourses();
        } catch (error) {
            console.error("Error deleting course: ", error);
        }
    };

    const updateCourse = async () => {
        try {
            await axios.put(`http://localhost:6006/api/courses/${editId}`, { title, description, duration });
            fetchCourses();
            setTitle("");
            setDescription("");
            setDuration("");
            setEditId(null);
        } catch (error) {
            console.error("Error updating course: ", error);
        }
    };

    const handleEdit = (course) => {
        setTitle(course.title);
        setDescription(course.description);
        setDuration(course.duration);
        setEditId(course._id);
    };

    return (
        <div className="container">
            <h1>Courses</h1>
            <div className="form-container">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" />
                {editId ? (
                    <button onClick={updateCourse}>Update Course</button>
                ) : (
                    <button onClick={addCourse}>Add Course</button>
                )}
            </div>
            <div className="course-list">
                {courses.map((course) => (
                    <div key={course._id} className="course">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>{course.duration}</p>
                        <button className="button" onClick={() => deleteCourse(course._id)}>Delete</button>
                        <button className="button" onClick={() => handleEdit(course)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddCourse;
