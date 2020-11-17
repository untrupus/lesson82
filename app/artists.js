const express = require('express');
const router = express.Router();
const config = require("../config");
const Artist = require('../models/Artist');

const createRouter = () => {
    router.get('/', async (req, res) => {
        const result = await Artist.find();
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    });

    router.post('/', config.upload.single("image"), async (req, res) => {
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