const path = require("path");
const {nanoid} = require('nanoid');
const multer = require('multer');

const rootPath = __dirname;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  path.join(rootPath, 'public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

module.exports = {
    upload,
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    db: {
        name: "lastFM",
        url: "mongodb://localhost"
    },
    fb: {
        appId: '208786600736692',
        appSecret: '5189cda1f8d3a440b535a87f049229ae'
    }
};