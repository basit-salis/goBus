const express = require('express');
const router = express.Router();


//signin get handle
module.exports.get_seats = async (req, res) => {
    res.render('seats');
};

