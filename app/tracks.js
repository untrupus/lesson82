const express = require('express');
const router = express.Router();
const Track = require('../models/Track');
const auth = require('../middleware/auth');
const permit = require("../middleware/permit")

const createRouter = () => {
    router.get('/',  async (req, res) => {
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

    router.post('/', auth, async (req, res) => {
        const trackData = req.body;
        trackData.user = req.user._id;
        const track = new Track(trackData);
        try {
            await track.save();
            res.send(track);
        } catch (e) {
            res.status(400).send(e);
        }
    });

    router.delete('/:id', [auth, permit("admin")], async (req, res) => {
        const result = await Track.findByIdAndRemove({_id: req.params.id});
        if (result) {
            res.send("Artist removed");
        } else {
            res.sendStatus(404);
        }
    });

    router.put('/:id', [auth, permit("admin")], async (req, res) => {
        if (req.body.user) {
            res.send("You can`t change user");
        } else {
            const result = await Track.findByIdAndUpdate(req.params.id, req.body);
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        }
    });

    return router;
};

module.exports = createRouter();