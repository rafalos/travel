const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const jwtSecret = 'fnr3u24buiabfasiufb4ui3fbaisubf';
const CookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Place = require('./models/Place');
const authRoutes = require('./routes/auth');

mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(CookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

app.use('/auth', authRoutes);

app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log(data);
        const { name, email, _id } = await User.findById(data.id);
        res.json({ name, email, _id });
      }
    });
  } else {
    res.json(null);
  }
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + '.jpg';
  const path = `${__dirname}/uploads/${newName}`;
  await imageDownloader.image({
    url: link,
    dest: path,
  });

  res.json(newName);
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

const photosMiddleware = multer({
  dest: 'uploads',
});

app.post('/upload', photosMiddleware.array('photos', 10), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const newPath = path + '.' + extension;
    fs.renameSync(path, newPath);

    uploadedFiles.push(newPath.replace('uploads/', ''));
  }
  res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, data) => {
    if (err) {
      throw err;
    }

    const place = await Place.create({
      owner: data.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      price,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });

    res.json(place);
  });
});

app.get('/places', async (req, res) => {
  const places = await Place.find();

  res.json(places);
});

app.get('/user-places', (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, data) => {
    if (err) {
      throw err;
    }

    const { id } = data;
    const userPlaces = await Place.find({
      owner: id,
    });

    res.json(userPlaces);
  });
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;

  const place = await Place.findById(id);

  res.json(place);
});

app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    price,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, data) => {
    if (err) {
      throw err;
    }
    const { id: userId } = data;
    const place = await Place.findById(id);
    if (userId === place.owner.toString()) {
      await place.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        price,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      await place.save();
      res.json('ok');
    }
  });
});

app.listen(4000);
