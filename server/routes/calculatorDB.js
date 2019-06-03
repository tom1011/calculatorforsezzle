const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const Math = require('mathjs');

// gets the last ten math prolblems and takes to 
router.get('/currentlastten', (req, res) => {
    console.log('in get top ten')
    const queryText = 'SELECT * FROM "currentten" ORDER BY id DESC LIMIT 10;'
    pool.query(queryText)
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('Error completing get shelf query', err);
            res.sendStatus(500);
        });
})

// post the last problem to the DB
router.post('/postLastTen', (req, res) => {
    let answer = Math.eval((req.body.currentOutput));
    let mathProblem = req.body.currentOutput + '=' + answer;
    const queryText = 'INSERT INTO "currentten" ("problem") VALUES ($1)';
  pool.query(queryText, [mathProblem])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
})

module.exports = router;