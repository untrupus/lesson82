const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const config = require("../config");
const {nanoid} = require('nanoid');
const Artist = require('../models/Artists');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const createRouter = () => {
    router.get('/', async (req, res) => {
        const result = await Artist.find();
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    });

    router.post('/', upload.single("image"), async (req, res) => {
        const artistData = req.body;
        if (req.file) {
            artistData.image = req.file.filename;
        }
        const artist = new Artist(artistData)
        try {
            await artist.save();
            res.send(artist);
        } catch (e) {
            res.status(400).send(e);
        }
    });
    return router;
};

module.exports = createRouter();