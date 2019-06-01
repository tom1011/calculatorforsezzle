const express = require('express');
const app = express();

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

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

