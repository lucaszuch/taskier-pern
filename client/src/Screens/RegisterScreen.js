import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterScreen({setAuth}) {
  //Local hooks
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  //Handles user registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      //Sending info to server
      const data = {name, email, password, password2};
      const response = await fetch('http://localhost:5000/users/register', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      
      //Parsing response information
      const parseResponse = await response.json();

      //Checking authorization
      if(parseResponse.jwtToken) {
        localStorage.setItem('token', parseResponse.jwtToken);
        setAuth(true);
        toast.success('Registration completed');
      } else {
        setAuth(false);
        toast.error(parseResponse);
      }

    } catch (error) {
      //If server error
      console.error(error.message);      
    }
  }

  //Rendering content
  return (
    <div className="registerScreenWrapper">
      <div className="loginScreenTitle">
        <h2>REGISTER SCREEN</h2>
      </div>
      <div className="registerFormWrapper">
        <form onSubmit={handleRegister}>
        <div className="registerFormName">
            <label for="text" className="form-label">Name:</label>
            <input type="text"
                   id="text"
                   className="form-control"
                   placeholder="Your name"
                   onChange={(e) => setName(e.target.value)}
                   required>
            </input>
          </div>
          <div className="registerFormEmail">
            <label for="email" className="form-label">Email:</label>
            <input type="email"
                   id="email"
                   className="form-control"
                   placeholder="email@email.com"
                   onChange={(e) => setEmail(e.target.value)}
                   required>
            </input>
          </div>
          <div className="registerFormPassword">
            <label for="password" className="form-label">Password:</label>
            <input type="password"
                   id="password"
                   className="form-control"
                   placeholder="Your password"
                   onChange={(e) => setPassword(e.target.value)}
                   required>
            </input>
          </div>
          <div className="registerFormConfirmPassword">
            <label for="password2" className="form-label">Confirm Password:</label>
            <input type="password"
                   id="password2"
                   className="form-control"
                   placeholder="Confirm your password"
                   onChange={(e) => setPassword2(e.target.value)}
                   required>
            </input>
          </div>
          <div className="btnLogin">
            <button type="submit"
                    className="btn btn-primary">
                     Register
            </button>
          </div>
        </form>
      </div>

      <div className="registerScreenRegistered">
        <h3>Already registered?</h3>
        <button className="btn btn-success">
          <Link to='/'>Login</Link>
        </button>
      </div>
    </div>
  )
}

export default RegisterScreen;