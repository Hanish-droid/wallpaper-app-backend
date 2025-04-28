const express = require('express');
const multer = require('multer');
const { uploadWallpaper, getWallpapers } = require('../controllers/wallpaperController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('wallpaper'), uploadWallpaper);
router.get('/', getWallpapers);

module.exports = router;
