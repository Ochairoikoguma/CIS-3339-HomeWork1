const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

// Create an enrollment (student + course)
router.post('/', async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    if (!studentId || !courseId) {
      return res.status(400).json({ error: 'studentId and courseId are required' });
    }

    const enrollment = await Enrollment.create({ student: studentId, course: courseId });
    res.status(201).json(enrollment);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Student is already enrolled in this course' });
    if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
    if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid student or course ID' });
    res.status(500).json({ error: 'Server error' });
  }
});

// List all students enrolled in a given course
router.get('/course/:courseId', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.courseId }).populate('student');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;