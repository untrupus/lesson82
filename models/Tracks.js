const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrackSchema = new Schema({

});

const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;