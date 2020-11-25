const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectID,
        ref: "Artist",
        required: true
    },
    image: String,
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

AlbumSchema.plugin(idValidator);
const Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;