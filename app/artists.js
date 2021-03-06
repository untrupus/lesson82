const express = require('express');
const router = express.Router();
const config = require("../config");
const Artist = require('../models/Artist');
const auth = require('../middleware/auth');
const permit = require("../middleware/permit")


const createRouter = () => {
    router.get('/', async (req, res) => {
        const result = await Artist.find();
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    });

    router.post('/', [auth, config.upload.single("image")], async (req, res) => {
        const artistData = req.body;
        artistData.user = req.user._id;
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

    router.delete('/:id', [auth, permit("admin")], async (req, res) => {
        const result = await Artist.findByIdAndRemove({_id: req.params.id});
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
            const result = await Artist.findByIdAndUpdate(req.params.id, req.body);
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