const express = require('express');
const app = express();
const cors = require('cors');

//Importing DB and passport cnonfiguration
const pool = require('./db');

//Declaring port
const port = 5000;

//Middlewares
app.use(cors()); //allows local applications to run at the same time.
app.use(express.json()) //allows us to access req.body;
app.use(express.urlencoded({extended: false}));

//SERVER TEST ROUTE
app.get('/', (req, res) => {
  res.send('Server is running at port 5000')
});

//USER ROUTES
app.use('/users', require('./routes/userAuth'));

//TODO ROUTES
app.use('/dashboard', require('./routes/dashboard'));

//App listening to port
app.listen(port, () => {
  console.log(`App is now listening to Port: ${port}`);
});