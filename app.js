require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const wallpaperRoutes = require('./routes/wallpaperRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/wallpapers', wallpaperRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.log(err));
