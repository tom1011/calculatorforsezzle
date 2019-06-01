const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/currenttopten', (req, res) => {
    res.send(500)
})

router.post('/postTopTen', (req, res) => {
    
})