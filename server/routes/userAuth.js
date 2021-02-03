const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validateInfo = require('../middleware/validateInfo');
const authorize = require('../middleware/authorize');

//Require pool
const pool = require('../db');

//Register Routes
router.post('/register', validateInfo, async (req, res) => {
  try {
  //Get form values
  const {name, email, password} = req.body;
  const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
  [email]
  );

  //Check if user exists
  if(user.rows.length !== 0) {
    return res.status(401).json('User already exists!');
  }

  //Create hashedPassword
  let hashedPassword = await bcrypt.hash(password, 10);

  //Insert user in the DB
  let newUser = await pool.query(
    "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );

  //Create jwtToken
  const jwtToken = jwtGenerator(newUser.rows[0].user_id);
  return res.json({jwtToken});
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.')
  }
});

//Login routes
router.post('/login', validateInfo, async (req, res) => {
  try {
    //Get form values
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
    [email]
    );

    //Check if user exists (email)
    if(user.rows.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    //Compares hashedPasswords
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

    if(!validPassword) {
      return res.status(401).send('Invalid Credentials');
    }

    //Generates jwtToken
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({jwtToken});

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

router.post('/verify', authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;