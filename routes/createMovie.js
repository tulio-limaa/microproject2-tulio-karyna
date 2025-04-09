// Import express and the movie model
import express from 'express';
import Movie from '../models/movie.js';

const router = express.Router();

// Create route to create a movie
router.post('/', async (req, res) => {
  try {
    console.log(req.body); 

    const { title, director, release_year, genre } = req.body;

    // Check that all required fields are provided.
    if (!title || !director || !release_year || !genre) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newMovie = new Movie({
      title,
      director,
      release_year,
      genre,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;