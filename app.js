const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
const wallpaperRoutes = require('./routes/wallpaperRoutes');
app.use('/api/wallpapers', wallpaperRoutes);

// MongoDB Connection
async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit the process if connection fails
    }
  }
  
connectToDatabase();

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to the database');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });

mongoose.set('bufferCommands', false);


// Listen on dynamic PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
