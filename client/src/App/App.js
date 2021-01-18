import React, {useState, Fragment} from 'react';
import './App.css';

//Importing components
import Form from '../Components/Form/Form';
import TodoList from '../Components/TodoList/TodoList';


function App() {
  //States
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  //render()
  return (
    <Fragment>
      <div className="App">
        <div className="AppWrapper">
        <Form description={description}
              setDescription={setDescription}/>
        <TodoList todos={todos}
                  setTodos={setTodos}
                  description={description}
                  setDescription={description}/>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
