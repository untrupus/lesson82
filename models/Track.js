const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

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
        // required: true
    },
    number: {
        type: Number,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectID,
        ref: "Artist",
        // required: true
    },
    youtube: String,
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    }
});

TrackSchema.plugin(idValidator);
const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;