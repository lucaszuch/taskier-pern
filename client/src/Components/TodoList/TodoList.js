import React, {Fragment, useEffect} from 'react';

//Importing components
import EditTodo from '../EditTodo/EditTodo';

function TodoList({todos, setTodos, description, setDescription, allTodos, setChangeTodos}) {
  //Delete todo
  const handleDelete = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: {jwt_token: localStorage.token}
      });
      
      //Filter through todos and remove the missing id
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  //Load todos
  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <Fragment>
      <div className="todoContainer">
        {
          todos[0]?.todo_id ? //falsy, same as todos[0].todo_id !== 0
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
                        todo={todo}
                        setChangeTodos={setChangeTodos}/>
          </div>
          ))}
        </ul>
        :
        <div className="emptyList">
            {/* No tasks */}
        </div>
        }
      </div>
      </Fragment>
  )
}

export default TodoList;