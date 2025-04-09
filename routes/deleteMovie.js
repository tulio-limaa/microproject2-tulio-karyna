// Import express and the movie model
import express from 'express';
import Movie from '../models/movie.js';

const router = express.Router();

// Delete route to remove a movie
router.delete('/:movie_id', async (req, res) => {
    try {
        const { movie_id } = req.params;
        const deletedMovie = await Movie.findOneAndDelete({ _id: movie_id });
        
        // If the movie is not found, respond with a 404 error and a message
        if (!deletedMovie) {
            return res.status(404).json({ message: `Movie with movie_id ${movie_id} not found` });
        }

        // If the movie was successfully deleted, return a success message
        res.status(200).json({ message: `Movie with movie_id ${movie_id} deleted successfully` });
    } catch (error) {
        // If an error occurs, return a 400 error
        res.status(400).json({ message: error.message });
    }
});

export default router;
