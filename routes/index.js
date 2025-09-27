const express = require('express');
const router = express.Router();
const upload = require('./upload'); // your multer middleware
const Image = require('../models/images');

// GET / => Render index.ejs with image list and optional message
router.get('/', (req, res) => {
  Image.find({}, (err, images) => {
    if (err) {
      console.error("Error fetching images from DB:", err);
      return res.render('index', { images: [], msg: 'Error loading images.' });
    }

    res.render('index', {
      images: images,
      msg: req.query.msg
    });
  });
});

// POST /upload => Handle image upload
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.redirect(`/?msg=${encodeURIComponent(err)}`);
    }

    if (!req.file) {
      return res.redirect('/?msg=No file selected');
    }

    // Save image info to MongoDB
    const newImage = new Image({
      name: req.file.filename,
      size: req.file.size,
      path: 'images/' + req.file.filename // should match static folder path
    });

    newImage.save()
      .then(() => res.redirect('/?msg=File uploaded successfully'))
      .catch(dbErr => {
        console.error("Error saving image to DB:", dbErr);
        res.redirect('/?msg=Error saving image to database');
      });
  });
});

module.exports = router;
