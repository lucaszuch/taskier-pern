import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import './App.css';


//Importing components
import Dashboard from '../Screens/Dashboard';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';

function App() {
  //Fetching authentication from server
  const checkAuthenticated = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/verify', {
        method: 'POST',
        headers: {jwt_token: localStorage.token}
      });

      //Parsing response
      const parseResponde = await response.json();

      //Check if there's authentication
      parseResponde === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);      
    }
  }

  useEffect(() => {
    checkAuthenticated();
  }, []);

  //Local hooks
  const [isAuthenticated, setIsAuthenticated] = useState(false);  

  //Toggles authentication
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  }

  //Rendering content
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path='/' exact render={ (props) => !isAuthenticated ? ( <LoginScreen {...props} setAuth={setAuth} /> ) : ( <Redirect to='/dashboard'/> )} />
            <Route path='/register' render={ (props) => !isAuthenticated ? ( <RegisterScreen {...props} setAuth={setAuth} /> ) : ( <Redirect to='/dashboard' /> )} />
            <Route path='/dashboard' render={ (props) => isAuthenticated ? ( <Dashboard {...props} setAuth={setAuth} /> ) : ( <Redirect to='/' /> )} />
          </Switch>
      </div>
    </Router>
    
  );
}

export default App;
