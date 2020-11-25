const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
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

const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;