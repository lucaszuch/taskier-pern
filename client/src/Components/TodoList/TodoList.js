import React, {Fragment, useEffect} from 'react';
import './TodoList.css';

//Importing components
import EditTodo from '../EditTodo/EditTodo';

function TodoList({todos, setTodos, description, setDescription}) {
  //Delete todo
  const handleDelete = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  //Get all the todos
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Load todos
  useEffect(() => {
    getTodos();
  }, [todos]);

  return (
    <Fragment>
      <div className="todoContainer">
        <ul className="todoList">
          {todos.map(todo => (
            <div className="todoBox"
                  key={todo.todo_id}>
              <p className="todoItem"
                     >{todo.description}</p>
              <button className="btn btn-danger"
                      onClick={() => handleDelete(todo.todo_id)}>
                <i class="fa fa-trash"></i>
              </button>
              <EditTodo description={description}
                        setDescription={setDescription}
                        todo={todo}/>
          </div>
          ))}
        </ul>
      </div>
      </Fragment>
  )
}

export default TodoList;