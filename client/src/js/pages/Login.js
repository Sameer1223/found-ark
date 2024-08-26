import React, { useState } from "react";
import { api } from "../api";
import { useMutation } from '@apollo/client';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [login] = useMutation(api.signin(
        username,
        password
      ), {
        onCompleted: (data) => {
            console.log("HELLLOOOOOO");
            localStorage.setItem('token', data.signin.jwt);
            console.log("Data: " + data) // the response
        },
        context: {
            headers: {
                "authorization": `Bearer ${data.signin.jwt}`
            }
        }
      });

    return (
        <div>
            <h2>HTML Forms</h2>
            <form onSubmit={() => {
                console.log("Stuff here: ", username, password);
                login({
                    variables: {
                        username: username,
                        password: password
                    }
                })
                }}>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required/>
                <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                <input type="submit" value="Submit"/>
            </form> 
        </div>
    );
}

export default Login;