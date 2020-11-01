const express = require('express');
const router = express.Router();
const Track = require('../models/Tracks');

const createRouter = () => {
    router.get('/', async (req, res) => {
        let query;
        if (req.query.album) {
            query = {album: req.query.album}
        }
        const result = await Track.find(query).populate("album");
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    });

    return router;
};

module.exports = createRouter();