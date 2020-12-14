const mongoose = require("mongoose");
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");
const TrackHistory = require("./models/TrackHistory");

mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("albums");
        await db.dropCollection("artists");
        await db.dropCollection("users");
        await db.dropCollection("tracks");
        await db.dropCollection("trackhistories");
    } catch (e) {
        console.log("Collection were not presented!");
    }

    const [user, admin] = await User.create({
        email: "asd@asd.asd",
        password: "123",
        token: nanoid(),
        role: "user",
        displayName: "Vegard",
        avatarImage: "ihsahn.jpeg"
    }, {
        email: "qwe@.qwe.qwe",
        password: "123",
        token: nanoid(),
        role: "admin",
        displayName: "Admin"
    });

    const [death, nin, morfer] = await Artist.create({
        name: "Death",
        image: "death.jpg",
        published: true,
        user: user._id
    }, {
        name: "NIN",
        image: "nin.png",
        published: true,
        user: user._id
    }, {
        name: "Morfer",
        image: "morfer.png",
        published: false,
        user: user._id
    });

    const [human, symbolic, spiral, tribunal] = await Album.create({
        name: "Human",
        year: 1991,
        artist: death._id,
        image: "Human.jpg",
        published: false,
        user: user._id
    }, {
        name: "Symbolic",
        year: 1995,
        artist: death._id,
        image: "symbolic.jpg",
        published: true,
        user: user._id
    }, {
        name: "The Downward Spiral",
        year: 1994,
        artist: nin._id,
        image: "downward.jpg",
        published: true,
        user: user._id
    }, {
        name: "Tribunal",
        year: 2020,
        artist: morfer._id,
        image: "tribunal.png",
        published: true,
        user: user._id
    });

    const [lack, see, sacred, crystal, hurt, vandallen] = await Track.create({
            name: "Lack Of Comprehension",
            duration: "3.47",
            album: human._id,
            number: 5,
            youtube: "7j8vUbMmOwM",
            published: true,
            artist: death._id,
            user: user._id
        }, {
            name: "See Through Dreams",
            duration: "3.56",
            album: human._id,
            number: 6,
            published: false,
            artist: death._id,
            user: user._id
        }, {
            name: "Sacred Serenity",
            duration: "4.29",
            album: symbolic._id,
            number: 3,
            youtube: "-as4LausEok",
            published: true,
            artist: death._id,
            user: user._id
        }, {
            name: "Crystal mountain",
            duration: "5.07",
            album: symbolic._id,
            number: 6,
            youtube: "zguCFjHyVeM",
            published: false,
            artist: death._id,
            user: user._id
        }, {
            name: "Hurt",
            duration: "3.56",
            album: spiral._id,
            number: 1,
            youtube: "6oGqIfnIAEA",
            published: true,
            artist: nin._id,
            user: user._id
        }, {
            name: "Heresy",
            duration: "4.22",
            album: spiral._id,
            number: 2,
            published: false,
            artist: nin._id,
            user: user._id
        }, {
            name: "Vandallen",
            duration: "6.29",
            album: tribunal._id,
            number: 1,
            youtube: "4A2N2u9ee1o",
            published: false,
            artist: morfer._id,
            user: user._id
        }, {
            name: "Forbannet",
            duration: "6.29",
            album: tribunal._id,
            number: 2,
            published: true,
            artist: morfer._id,
            user: user._id
        }, {
            name: "Dark Wisdom",
            duration: "6.29",
            album: tribunal._id,
            number: 3,
            published: false,
            youtube: "HLR8YWIuEOk",
            artist: morfer._id,
            user: user._id
        },
    );

    await TrackHistory.create({
            user: user._id,
            track: lack._id,
            datetime: "Wed Nov 18 2020 01:59:36 GMT+0600 (Kyrgyzstan Time)"
        }, {
            user: user._id,
            track: see._id,
            datetime: "Wed Nov 18 2020 02:59:36 GMT+0600 (Kyrgyzstan Time)"
        }, {
            user: user._id,
            track: sacred._id,
            datetime: "Wed Nov 18 2020 03:59:36 GMT+0600 (Kyrgyzstan Time)"
        },
    );

    db.close();
});