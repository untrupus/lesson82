const express = require("express");
const app = express();
const mongoose = require("mongoose");
const artists = require("./app/artists");
const albums = require("./app/albums");
const tracks = require("./app/tracks");
const port = 8000;

app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect("mongodb://localhost/lastFM", {useNewUrlParser: true, useUnifiedTopology: true});
    app.use("/artists", artists);
    app.use("/albums", albums);
    app.use("/tracks", tracks);
    console.log("Connected");
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.error);