process.env.PWD = process.cwd();

var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;

// var io = require('socket.io');

//non socket related
const math = require('mathjs');
//end nonsocket related

// // start hosting server consts -- heroku dev set up

const socketIO = require('socket.io');
const path = require('path');
// const INDEX = path.join(__dirname, 'index.html');
const INDEX = path.join(process.env.PWD + '/build/public/index.html');
const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(server);

// end hosting server -- end heroku dev set up

// Serve static files

// app.use(express.static('build/public/index.html'));

/** Listen * */
let problems = [];
let activeListeners = [];

/** Listen * */


// this is DBless and only stores the list here on the server. this was done
// due to the rules google had on using SQLDB so to get around those limits we just save it on the server.

io.on('connection', listener => {
    console.log('connected to io');
    activeListeners.push(listener);
    listener.emit('mathproblem', problems);

    listener.on('mathproblem', data => {
        console.log('in the mathproblem.on section logging data', data);
        let answer = math.eval(data.problem);
        if (answer) {
            // minor validation so that only math problems with answers will be displyed.
            let mathProblem = data.problem + ' = ' + answer;
            problems.unshift(mathProblem);
            if (problems.length > 10) problems.length = 10;
            activeListeners.forEach(listener => listener.emit('mathproblem', problems));
        }
        // below is all sockets on the server
    });

    listener.on('disconnect', conn => {
        activeListeners = activeListeners.filter(list => list.id !== conn.id);
    })
});
