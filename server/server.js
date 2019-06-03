const express = require('express');
const app = express();
var io = require('socket.io')();


// experamenting with diffrent things
const axios = require('axios'); // try import axios if this dose not
const pool = require('./modules/pool')
const Math = require('mathjs');


// Body parser middleware -- not working for some reason it adds { : '' } around the req.body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Route includes
const topTenRouter = require('./routes/calculatorDB'); // this is the route to get a post the math problems

/* Routes */
app.use('/mathProblems', topTenRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

const ioPORT = 8000; // might need to put this on a diffrent server
io.listen(ioPORT);
console.log('listening on port ', ioPORT);

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


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
    let mathProblem = data.problem + '=' + answer;
    const queryText = 'INSERT INTO "currentten" ("problem") VALUES ($1)';
    pool.query(queryText, [mathProblem])
      .then(() => {
        console.log('in get from DB now')
        let newqueryText = 'SELECT * FROM "currentten" ORDER BY id DESC LIMIT 10;'
        pool.query(newqueryText)
        .then((result) => { io.sockets.emit('mathproblem', result.rows) })

      })
    // below is all sockets on the server

  })
})