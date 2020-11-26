const express = require('express');
const router = express.Router();
const config = require("../config");
const Album = require('../models/Album');
const Tracks = require('../models/Track');
const auth = require('../middleware/auth');
const permit = require("../middleware/permit")

const createRouter = () => {
    router.get('/', async (req, res) => {
        let query;
        if (req.query.artist) {
            query = {artist: req.query.artist}
        }
        const result = await Album.find(query).sort({"year": 1}).populate({path: "artist", select: "name"});
        const newResult = result.map(async album => {
            const tracks = await Tracks.find({album: album._id});
            return {...album._doc, count: tracks.length};
        });
        const qwer = await Promise.all(newResult);
        if (result) {
            res.send(qwer);
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

    router.post('/', [auth, config.upload.single("image")], async (req, res) => {
        const albumData = req.body;
        albumData.user = req.user._id;
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

    router.delete('/:id', [auth, permit("admin")], async (req, res) => {
        const result = await Album.findByIdAndRemove({_id: req.params.id});
        if (result) {
            res.send("Artist removed");
        } else {
            res.sendStatus(404);
        }
    });

    router.patch('/:id', [auth, permit("admin")], async (req, res) => {
        if (req.body.user) {
            res.send("You can`t change user");
        } else {
            const result = await Album.findByIdAndUpdate(req.params.id, req.body);
            if (result) {
                res.send('Success');
            } else {
                res.sendStatus(404);
            }
        }
    });

    return router;
};

module.exports = createRouter();