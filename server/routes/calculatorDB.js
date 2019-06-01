const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/currenttopten', (req, res) => {
    res.send(500)
})

router.post('/postLastTen', (req, res) => {
    console.log('post route was hit')
})

module.exports = router;