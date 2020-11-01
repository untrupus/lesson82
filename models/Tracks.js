const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    duration: String,
    album: {
        type: Schema.Types.ObjectID,
        ref: "Album",
        required: true
    }
});

const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;