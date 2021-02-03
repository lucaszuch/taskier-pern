const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorize = require('../middleware/authorize');

//Get all todos
router.get('/', authorize, async (req, res) => {
  try {
    const user = await pool.query('SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1',
    [req.user.id]
    );
    res.json(user.rows); //Returns all the results for that specific user > replaced res.json(user.rows[0])
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Create a todo
router.post('/todos', authorize, async (req, res) => {
  try {
    const {description} = req.body;
    const newTodo = await pool.query('INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *',
      [req.user.id, description]
    );
    res.json(newTodo.rows[0]);
    console.log('Todo create!');

  } catch (err) {
    console.error(err.message);
  }
});

//Update a todo
router.put('/todos/:id', authorize, async (req, res) => {
  try {
    const {id} = req.params;
    const {description} = req.body;
    const updateTodo = await pool.query('UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *',
    [description, id, req.user.id]
    );
    
    //Check if specific todo belongs to user
    if(updateTodo.rows.length === 0) return res.json('You cannot edit this task.')

    //Updates if correct inputs
    res.json('To do was updated!');

  } catch (err) {
    console.error(err.message);    
  }
});

//Delete a todo
router.delete('/todos/:id', authorize,  async (req, res) => {
  try {
  const {id} = req.params;
  const deleteTodo = await pool.query('DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *',
  [id, req.user.id]);

  //Check if specific todo belongs to user
  if(deleteTodo.rows.length === 0) return res.json('You cannot edit this task.')
  
  //Logs if correct inputs
  res.json(`Todo id ${id} was removed.`)

  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;