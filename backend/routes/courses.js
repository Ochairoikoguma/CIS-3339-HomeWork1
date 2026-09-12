const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// List all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a course
router.post('/', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Course ID already exists' });
    if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a course (and cascade delete its enrollments)
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    await Enrollment.deleteMany({ course: course._id }); // cascade
    res.json({ message: 'Deleted', course });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;