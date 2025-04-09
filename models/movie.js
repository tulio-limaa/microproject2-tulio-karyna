// Import mongoose to work with MongoDB
import mongoose from 'mongoose';

// Define the movie schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  director: {
    type: String,
    required: true,
    trim: true
  },
  releaseYear: {
    type: Number,
  },
  genre: {
    type: String,
    enum: ['Action', 'Romance', 'Drama', 'Horror', 'Thriller', 'Other']
  },
}, { timestamps: true });

//Create a movie model
const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
