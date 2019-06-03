const express = require('express'); 
app = express();
// var socketIO = require('socket.io')();
const pool = require('./modules/pool')
const Math = require('mathjs');
const socketIO = require('socket.io');
const path = require('path');


port = process.env.PORT || 5000,
server = app.listen(port, function () {
  console.log('Server running on port ' + port)
}),
socket = require('socket.io'),
io = socket.listen(server)

// Serve static files
// app.use(express.static('build'));

io.set('origins', '*:*')
io.set('match origin protocol', true)

app.use(express.static(path.join(__dirname, 'public')))

// const server = express()
//   .use((req, res) =>
//   res.sendFile(INDEX) )
//   .listen(PORT, () => console.log(`Listening on  the ${ PORT }`));
//  // might need to put this on a diffrent server

// io.listen(PORT);
//   console.log('listening on port ', PORT);

// const io = socketIO(server);

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