import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginScreen({setAuth}) {
  //Local hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Handles user registration
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {email, password};
      const response = await fetch(`http://localhost:5000/users/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      
      //Parsing response
      const parseResponse = await response.json();

      //Checking authorization
      if(parseResponse.jwtToken) {
        localStorage.setItem('token', parseResponse.jwtToken);
        setAuth(true);
        toast.success('You are logged in');
      } else {
        setAuth(false);
        toast.error(parseResponse);
      }
    } catch (error) {
      console.error(error.message);      
    }
  }

  //Rendering content
  return (
    <div className="loginScreenWrapper">
      <div className="loginScreenTitle">
        <h2>LOGIN SCREEN</h2>
      </div>
      <div className="loginFormWrapper">
        <form onSubmit={handleLogin}>
          <div className="loginFormEmail">
            <label for="email" className="form-label">Email:</label>
            <input type="email"
                   id="email"
                   className="form-control"
                   placeholder="email@email.com"
                   onChange={(e) => setEmail(e.target.value)}
                   required>
            </input>
          </div>
          <div className="loginFormPassword">
            <label for="password" className="form-label">Password:</label>
            <input type="password"
                   id="password"
                   className="form-control"
                   placeholder="Your password"
                   onChange={(e) => setPassword(e.target.value)}
                   required>
            </input>
          </div>
          <div className="btnLogin">
            <button type="submit"
                    className="btn btn-primary">
                     Login
            </button>
          </div>
        </form>
      </div>

      <div className="loginScreenRegister">
        <h3>Not registered?</h3>
        <button className="loginScreenRegisterLink btn btn-success">
          <Link to='/register'>Register</Link>
        </button>
      </div>
    </div>
  )
}

export default LoginScreen;