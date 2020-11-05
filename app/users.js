const router = require("express").Router();
const User = require("../models/User");
const TrackHistory = require("../models/TrackHistory");

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
    await user.save();
    return res.send({message: 'Username and password correct!', user});
});

router.post("/track_history", async (req, res) => {
   const token = req.get("Authorization");
   if(!token) {
       return res.status(401).send({error: "no token"});
   }
   const user = await User.findOne({token});
   if (!user) {
       return res.status(401).send({error: "Unauthorized"})
   }

   const historyData = req.body;
   historyData.user = user._id;
   historyData.datetime = new Date();
    const history = new TrackHistory(historyData);
    try {
        await history.save();
        res.send(history);
    } catch (e) {
        res.status(400).send(e);
    }

});

module.exports = router;