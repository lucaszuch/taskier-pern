import React, {useState, Fragment, useEffect} from 'react';
import { toast } from 'react-toastify';

//Importing components
import Form from '../Components/Form/Form';
import TodoList from '../Components/TodoList/TodoList';

function Dashboard({setAuth}) {
  //Local states user authentication
  const [name, setName] = useState('');

  //Local states to-do list
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [changeTodos, setChangeTodos] = useState(false);

  //Getting user info
  const getUser = async () => {
    try {
      //Fetching information from server
      const response = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: {jwt_token: localStorage.token}
      });
      //Parsing data to client
      const userData = await response.json();
      //Pass all the todos to state
      setAllTodos(userData);
      //Fetch user_name from userData
      setName(userData[0].user_name);
      //Create success box
      toast.success('You\'re in baby!');
    } catch (err) {
      console.error(err.message);
    }
  }

  //Handling logout
  const handleLogout = async e => {
    try {
      //Removes token from the local headers
      localStorage.removeItem('token');
      //Set user as not auth
      setAuth(false);
      //Create logout box
      toast.success('You were logged out.')
    } catch (err) {
      console.error(err.message);      
    }
  }

  //Get profile and setChanged
   useEffect(() => {
    getUser();
    setChangeTodos(false);
  }, [changeTodos]);

  //Rendering content
  return (
    <Fragment>
        <div className="dashboardWrapper">
          <Form description={description}
                setDescription={setDescription}
                setChangeTodos={setChangeTodos}/>
          <TodoList todos={todos}
                    setTodos={setTodos}
                    description={description}
                    setDescription={description}
                    allTodos={allTodos}
                    setChangeTodos={setChangeTodos}/>
        </div>
        <div className="userWrapper">
            <h5>User: {name}</h5>
            <button onClick={e => handleLogout(e)}
                    className='btn btn-danger'
                    >
                      Logout
                    </button>
          </div>
    </Fragment>
  );
}

export default Dashboard;
