const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Route includes
const topTenRouter = require('./routes/calculatorDB'); // this is the route to get a post the math problems

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

