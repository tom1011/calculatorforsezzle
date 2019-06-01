const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// gets the last ten math prolblems and takes to 
router.get('/currentlastten', (req, res) => {
    console.log('in get current last ten route')
    const queryText = 'SELECT * FROM "currentten" ORDER BY id DESC LIMIT 10;'
    pool.query(queryText)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing get shelf query', err);
            res.sendStatus(500);
        });
})

router.post('/postLastTen', (req, res) => {
    console.log('post route was hit')
})

module.exports = router;