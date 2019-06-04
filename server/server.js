const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);
io.origins("*:*");
const pool = require('./modules/pool');
const math = require('mathjs');

// Serve static files
app.use(express.static('build'));

/** Listen * */

const PORT = process.env.PORT || 8000; // might need to put this on a diffrent server
server.listen(PORT);
console.log('listening on port ', PORT);

io.on('connection', socket => {
    console.log('connected to io');
    let firstget = 'SELECT * FROM "currentten" ORDER BY id DESC LIMIT 10;';
    pool.query(firstget).then(result => {
        io.sockets.emit('mathproblem', result.rows);
    });
    // socket.on looks for when a mathproblem is the name of the route is hit.
    socket.on('mathproblem', data => {
        console.log('in the mathproblem.on section logging data', data);
        // make a DB update then query here duh idiot.
        let answer = math.eval(data.problem);
        if (answer) {
            // minor validation so that only math problems with answers will be displyed.
            let mathProblem = data.problem + '=' + answer;
            const queryText = 'INSERT INTO "currentten" ("problem") VALUES ($1)';
            pool
                .query(queryText, [mathProblem]) // post of problem to DB ie saving between sestions
                .then(() => {
                    console.log('in get from DB now');
                    let newqueryText = 'SELECT * FROM "currentten" ORDER BY id DESC LIMIT 10;';
                    pool
                        .query(newqueryText) // get the last ten math problems from DB
                        .then(result => {
                            io.sockets.emit('mathproblem', result.rows);
                        });
                });
        }
        // below is all sockets on the server
    });
});