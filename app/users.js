const router = require("express").Router();
const User = require("../models/User");
const config = require("../config");

router.post("/", config.upload.single("avatarImage"), async (req, res) => {
   const userData = {
       displayName: req.body.displayName,
       username: req.body.username,
       password: req.body.password,
   }
   if (req.file) {
        userData.avatarImage = req.file.filename;
    }
    const user = new User(userData);
    try {
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

module.exports = router;