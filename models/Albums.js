const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

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
    },
    image: String
});

AlbumSchema.plugin(idValidator);
const Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;