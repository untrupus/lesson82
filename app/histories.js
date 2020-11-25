const router = require("express").Router();
const TrackHistory = require("../models/TrackHistory");
const auth = require("../middleware/auth");

router.post("/track_history", auth, async (req, res) => {
    const historyData = req.body;
    historyData.user = req.user._id;
    historyData.datetime = new Date();
    const history = new TrackHistory(historyData);
    try {
        await history.save();
        res.send(history);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get("/track_history", auth, async (req, res) => {
    const user = {user: req.user._id}
    const result = await TrackHistory.find(user).sort({"datetime": -1}).populate({path: "track",
        populate: {path: "album", populate: {path: "artist"}}});
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;