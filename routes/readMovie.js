// Import express and the movie model
import express from 'express';
import Movie from '../models/movie.js';

const router = express.Router();

// GET route to read all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();

        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found' });
        }

        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET route to read a single movie
router.get('/:movie_id', async (req, res) => {
    try {
        const { movie_id } = req.params;
        const movie = await Movie.findOne({ _id: movie_id });

        if (!movie) {
            return res.status(404).json({ message: `Movie with ID ${movie_id} not found` });
        }
        
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
