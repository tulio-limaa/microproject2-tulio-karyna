// Import express and the movie model
import express from 'express';
import Movie from '../models/movie.js';

const router = express.Router();

// PUT route to update a movie
router.put('/:movie_id', async (req, res) => {
    try {
        const { movie_id } = req.params;
        const { title, director, release_year, genre, country } = req.body;

        // Check that all required fields are provided
        if (!title || !director || !release_year || !genre || !country) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Find the movie and update it
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: movie_id },
            {
                title,
                director,
                release_year,
                genre,
                country,
            },
            { new: true }  
        );

        // If the movie isn't found, return a 404 status
        if (!updatedMovie) {
            return res.status(404).json({ message: `Movie with movie_id ${movie_id} not found` });
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
