const express = require('express');
const router = express.Router();
const config = require("../config");
const Album = require('../models/Albums');

const createRouter = () => {
    router.get('/', async (req, res) => {
        let query;
        if (req.query.artist) {
            query = {artist: req.query.artist}
        }
        const result = await Album.find(query).populate({path: "artist", select: "name"});
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    });

    router.get('/:id', async (req, res) => {
        const result = await Album.findById(req.params.id);
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    });

    router.post('/', config.upload.single("image"), async (req, res) => {
        const albumData = req.body;
        if (req.file) {
            albumData.image = req.file.filename;
        }
        const album = new Album(albumData)
        try {
            await album.save();
            res.send(album);
        } catch (e) {
            res.status(400).send(e);
        }
    });

    return router;
};

module.exports = createRouter();