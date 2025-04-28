const Wallpaper = require('../models/Wallpaper');
const { uploadToCloudinary } = require('../services/cloudinaryService');
const fs = require('fs');

exports.uploadWallpaper = async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadToCloudinary(file.path);
    const wallpaper = new Wallpaper({
      title: req.body.title,
      url: result.secure_url,
      tags: req.body.tags ? req.body.tags.split(',') : [],
    });
    await wallpaper.save();
    fs.unlinkSync(file.path); // delete local file after upload
    res.json(wallpaper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

exports.getWallpapers = async (req, res) => {
  try {
    const wallpapers = await Wallpaper.find().sort({ createdAt: -1 });
    res.json(wallpapers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch wallpapers' });
  }
};
