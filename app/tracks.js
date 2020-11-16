const express = require('express');
const router = express.Router();
const Track = require('../models/Tracks');
const auth = require('../middleware/auth');

const createRouter = () => {
    router.get('/', auth, async (req, res) => {
        let query;
        if (req.query.album) {
            query = {album: req.query.album};
        }
       const result = await Track.find(query).sort(
           {"number": 1}).populate({path: "album", populate: {path: "artist"}});
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