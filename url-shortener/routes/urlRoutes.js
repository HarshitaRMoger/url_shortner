const express = require('express');
const router = express.Router();

const Url = require('../models/Url');
const generateCode = require('../utils/generateCode');

// CREATE SHORT URL
router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const shortCode = generateCode();

    const newUrl = await Url.create({
      originalUrl,
      shortCode
    });

    res.json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`
    });

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// REDIRECT
router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ shortCode: code });

    if (url) {
      return res.redirect(url.originalUrl);
    }

    res.status(404).json({ error: "Not found" });

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;