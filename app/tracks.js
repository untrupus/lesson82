const express = require('express');
const router = express.Router();
const Track = require('../models/Tracks');

const createRouter = () => {
    router.get('/', async (req, res) => {
        let query, result;

        if (req.query.album) {
            query = {album: req.query.album}
            result = await Track.find(query).populate("album");
        } else if (req.query.artist) {
            query = {artist: req.query.artist}
            result = await Track.find("album.artist")
            console.log(query);
        }

        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    });

    router.post('/', async (req, res) => {
        const trackData = req.body;
        const track = new Track(trackData);
        try {
            await track.save();
            res.send(track);
        } catch (e) {
            res.status(400).send(e);
        }
    });

    return router;
};

module.exports = createRouter();