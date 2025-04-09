// Import modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import createMovie from './routes/createMovie.js';
import readMovie from './routes/readMovie.js';
import updateMovie from './routes/updateMovie.js';
import deleteMovie from './routes/deleteMovie.js';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI is not defined in environment variables!');
  process.exit(1);
}

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

main();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MongoDB, Express, and Node.js are working!');
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Healthy', timestamp: new Date() });
});

// CRUD routes
app.use('/movies', createMovie);
app.use('/movies', readMovie);
app.use('/movies', updateMovie);
app.use('/movies', deleteMovie);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Application URL: http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Server loading error:', err);
    process.exit(1); 
});