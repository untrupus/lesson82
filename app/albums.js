const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {nanoid} = require('nanoid');
const Album = require('../models/Albums');

const createRouter = () => {


    return router;
};

module.exports = createRouter();