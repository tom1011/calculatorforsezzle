const express = require('express'); 
const app = express();
// var socketIO = require('socket.io')();
const pool = require('./modules/pool')
const Math = require('mathjs');
const socketIO = require('socket.io');
const path = require('path');


// Serve static files
app.use(express.static('build'));

/** Listen * */
const PORT = process.env.PORT || 5000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  
//  // might need to put this on a diffrent server

// io.listen(PORT);
//   console.log('listening on port ', PORT);

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('connected to io')
  let firstget = 'SELECT * FROM "currentten" ORDER BY id DESC LIMIT 10;'
  pool.query(firstget)
  .then((result) => { io.sockets.emit('mathproblem', result.rows) });
  // socket.on looks for when a mathproblem is the name of the route is hit.
  socket.on('mathproblem', (data) => {
    console.log('in the mathproblem.on section logging data', data)
    // make a DB update then query here duh idiot.
    let answer = Math.eval((data.problem));
    if (answer){ // minor validation so that only math problems with answers will be displyed.
      let mathProblem = data.problem + '=' + answer;
    const queryText = 'INSERT INTO "currentten" ("problem") VALUES ($1)';
    pool.query(queryText, [mathProblem]) // post of problem to DB ie saving between sestions
      .then(() => {
        console.log('in get from DB now')
        let newqueryText = 'SELECT * FROM "currentten" ORDER BY id DESC LIMIT 10;'
        pool.query(newqueryText) // get the last ten math problems from DB
        .then((result) => { io.sockets.emit('mathproblem', result.rows) })
      })
    }

    socket.on('disconnect', () => console.log('Client disconnected'));

  })
})