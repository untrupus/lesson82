const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: Number,
    artist: {
        type: Schema.Types.ObjectID,
        ref: "Artist",
        required: true
    }
});

const Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;