const router = require("express").Router();
const User = require("../models/User");
const TrackHistory = require("../models/TrackHistory");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
   try {
       const user = new User(req.body);
       user.generateToken();
       await user.save();
       res.send(user);
   } catch (e) {
       return res.status(400).send(e);
   }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Username not found'});
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
        return res.status(400).send({error: 'Password is wrong'});
    }
    user.generateToken();
    await user.save({validateBeforeSave: false});
    return res.send({user});
});

router.delete("/sessions", async (req, res) => {
    const token = req.get("Authorization");
    const success = {message: "Success"};

    if (!token) return res.send(success);

    const user = await User.findOne({token});
    if (!user) return res.send(success);

    user.generateToken();
    user.save({validateBeforeSave: false});
});

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