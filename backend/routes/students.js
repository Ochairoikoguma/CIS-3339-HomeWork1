const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');

router.get('/', async (req, res) => {
  const { name } = req.query;
  const filter = name ? { name: new RegExp(name, 'i') } : {};
  const students = await Student.find(filter);
  res.json(students);
});

router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Student ID already exists' });
    if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  await Enrollment.deleteMany({ student: student._id }); // cascade
  res.json({ message: 'Deleted', student });
});

module.exports = router;