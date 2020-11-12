const express = require("express");
const app = express();
const mongoose = require("mongoose");
const artists = require("./app/artists");
const albums = require("./app/albums");
const tracks = require("./app/tracks");
const users = require("./app/users");
const cors = require('cors');
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const run = async () => {
    await mongoose.connect("mongodb://localhost/lastFM", options);
    app.use("/artists", artists);
    app.use("/albums", albums);
    app.use("/tracks", tracks);
    app.use("/users", users);
    console.log("Connected");
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.error);