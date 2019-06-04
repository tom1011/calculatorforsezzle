const express = require('express');
const app = express();
const pool = require('./modules/pool');
const math = require('mathjs');
// top no touch
app.use(express.static('build'));

let http = require("http");
const server = http.createServer(app);

const sio = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

const PORT = process.env.PORT || 8000; // might need to put this on a diffrent server
// Serve static files

/** Listen * */

sio.on('connection', socket => {
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

server.listen(PORT);
console.log('listing on PORT', PORT)