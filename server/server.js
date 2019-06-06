process.env.PWD = process.cwd();
const http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const math = require('mathjs');
const path = require('path');
const INDEX = path.join(process.env.PWD + '/build/index.html');
const server = http.createServer(app);

// end imports



app.use(express.static(path.join(process.env.PWD + '/build'), { maxAge: 86400000 }));
app.get('/', (req, res) => res.sendFile(INDEX));
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = require('socket.io')(server);

let problems = [];
let activeListeners = [];

io.sockets.on('connection', listener => {
    console.log('connected to io');
    activeListeners.push(listener);
    listener.emit('mathproblem', problems);

    listener.on('mathproblem', data => {
        console.log('in the mathproblem.on section logging data', data);
        let answer = math.eval(data.problem);
        if (typeof answer !== ('undefined' || 'null')) {
            let mathProblem = data.problem + ' = ' + answer;
            problems.unshift(mathProblem);
            if (problems.length > 10) problems.length = 10;
            activeListeners.forEach(listener => listener.emit('mathproblem', problems));
        } else {
            let mathProblem = 'Error calculating the following input: ' + data.problem;
            problems.unshift(mathProblem);
            if (problems.length > 10) problems.length = 10;
            activeListeners.forEach(listener => listener.emit('mathproblem', problems));
        }
    });

    listener.on('disconnect', conn => {
        activeListeners = activeListeners.filter(list => list.id !== conn.id);
    })
});
