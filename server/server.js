
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;
const path = require('path');

//non socket related
const pool = require('./modules/pool');
const math = require('mathjs');

//end nonsocket related

const INDEX = path.join(__dirname, 'index.html');
var socketio= require('socket.io');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


const io = socketio(server);
// Serve static files

app.use(express.static('build'));

/** Listen * */

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
