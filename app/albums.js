const express = require('express');
const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const {nanoid} = require('nanoid');
const Album = require('../models/Albums');

const createRouter = () => {
    router.get('/', async (req, res) => {
        let query;
        if (req.query.artist) {
            query = {artist: req.query.artist}
        }
        const result = await Album.find(query).populate("artist");
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

    router.post('/', async (req, res) => {
        const albumData = req.body;
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