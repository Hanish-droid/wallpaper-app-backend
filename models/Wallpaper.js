const mongoose = require('mongoose');

const wallpaperSchema = new mongoose.Schema({
  title: String,
  url: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Wallpaper', wallpaperSchema);
