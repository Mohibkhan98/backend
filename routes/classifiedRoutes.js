const express = require('express');
const router = express.Router();
const Classified = require('../models/classified');

// Post a new classified
router.post('/post', async (req, res) => {
  try {
    const newClassified = new Classified(req.body);
    await newClassified.save();
    res.status(201).json(newClassified);
  } catch (err) {
    res.status(500).json({ message: 'Error posting classified', error: err.message });
  }
});

// Delete a classified
router.delete('/:id', async (req, res) => {
  try {
    const deletedClassified = await Classified.findByIdAndDelete(req.params.id);
    if (!deletedClassified) {
      return res.status(404).json({ message: 'Classified not found' });
    }
    res.json({ message: 'Classified deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting classified', error: err.message });
  }
});

// Fetch all classifieds
router.get('/', async (req, res) => {
  try {
    const classifieds = await Classified.find();
    res.json(classifieds);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching classifieds', error: err.message });
  }
});

module.exports = router;
