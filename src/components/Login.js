import React, { useState } from "react";
import axios from "axios";


function Login(){
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
 
function successUser(e){
e.preventDefault();
const loginUsername = {
    username,
    password
}
axios.post("http://localhost:5001/login", loginUsername)
.then(res =>console.log(res.data))
.catch( error => console.error("There is an Error", error))
}

    return(
        <>
         <form onSubmit = {successUser} method="post">
            <div className="registration-container">
                <div className="info-component">
                    <div className="title-container">
                    <h1 className="regis-header">Login</h1>
                    </div>
                    <div>
                    <label className="reg-title">Username</label><br></br>
                    <input 
                    className="sign-input"  
                    type="text" 
                    placeholder="Enter your username..." 
                    size="70" name="username" 
                    value={username}
                    onChange={e=>setUserName(e.target.value)}
                   
                    ></input>
                    </div>
                    <div>                  
                    </div>

                    <div>
                    <label className="reg-title">Password</label><br></br>
                    <input 
                    className="sign-input"  
                    type="password" 
                    placeholder="Enter password..."
                     size="70" 
                     name="password" 
                     autoComplete="none" 
                     value={password}
                     onChange={e =>setPassword(e.target.value)}
                   
                     ></input>
                    </div>
                    <button type="submit" className="sign-button">Login</button>
                   
                    {/* <Button className="reg-button sign-input" variant="primary" type="submit">Register</Button> */}
                </div>
            </div>
        </form>
        </>
    )
}
 

export default Login;