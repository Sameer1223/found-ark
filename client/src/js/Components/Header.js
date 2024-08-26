import '../../style/Header.css'
import '../../style/Form.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { api } from '../api';
import { useMutation } from '@apollo/client';

function Header() {
  let navigate = useNavigate();
  const [showForm, setShowForm] = React.useState("Modal hide");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [user, setUser] = React.useState("");

  const [login] = useMutation(api.signin(
    username,
    password
  ), {
    onCompleted: (data) => {
        localStorage.setItem('token', data.signin.jwt);
        setUser(username);
        setMessage("");
        setShowForm("Modal hide")
    },
    onError: (error) => {
      setMessage("Incorrect login information!");
      //console.log(error);
    }
  });

  const [createUser] = useMutation(api.signup(
    username,
    password
  ), {
    onCompleted: (data) => {
        setMessage("Successfully signed up!")
    },
    onError: (error) => {
      console.log(error);
    }
  });

  function toggleForm() {
    if (showForm === "Modal hide") {
      setShowForm("Modal show");
    } else {
      setShowForm("Modal hide");

    }
  }
  
  function signIn(e) {
    e.preventDefault();
    //console.log(username, password);
    login({
      variables: {
          username: username,
          password: password
      }
    });
    setUsername("");
    setPassword("");
  }
  
  function signUp(e){
    e.preventDefault();
    //console.log(username, password);
    createUser({
      variables: {
        username: username,
        password: password
      }
    });
    setUsername("");
    setPassword("");
  }

  function signout(e){
    e.preventDefault();
    setUser("");
    localStorage.removeItem('token');
  }

  return (
    <div className="Header">
      <div className='Container'>
        <div className="Title" onClick={() => navigate("../", { replace: true })}>FOUND ARK</div>
        <div className="Links">
          <a type="button" onClick={() => navigate("../", { replace: true })}>HOME</a>
          <a type="button" onClick={() => navigate("../new", { replace: true })}>CREATE</a>
          <button className="User" onClick={toggleForm}>
            <img className="Pfp" src={require('../../images/user.png')}/>
          </button>
          <div>{user? user : '' }</div>
        </div>
        <div className={showForm}>
          {user
            ? 
            <form className={"Form Form--modal signout"} onSubmit={(e) => signIn(e)}>
              <div className='Form__signIn'>Sign Out</div>
                <p id='status_message'>{message}</p>
              <div id="submit_buttons">
              <button type="button" className="Form__submit" onClick={(e) => signout(e)}>Sign Out</button>
              </div>
            </form>
            : <form className={"Form Form--modal"} onSubmit={(e) => signIn(e)}>
                <div className='Form__signIn'>Sign In</div>
                <input type="text" className="Form__input" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input type="password" className="Form__input" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <p id='status_message'>{message}</p>
                <div id="submit_buttons">
                  <button type="button" className="Form__submit" onClick={(e) => signUp(e)}>Sign Up</button>
                  <button type="submit" className="Form__submit">Sign In</button>
                </div>
              </form>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;