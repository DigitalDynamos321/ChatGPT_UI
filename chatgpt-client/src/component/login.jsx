import React, { useState } from "react";
import '../component/login.css';
import {useNavigate,useLocation} from "react-router";
import Records from '../db.json';



const Login = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    

    const [logger,setLogger] = useState({
        emails:"",
        passwords:""
    });

    const handleChange = (event) =>{
        let name = event.target.name;
        let value = event.target.value;

        setLogger({...logger,[name]:value})
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const {emails,passwords} = logger;
        const encode = btoa(passwords);
        try{
            const res = await fetch('/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    emails,encode
                })
            })

            if(Records.map(record=>record.encode) == atob(encode)){
                window.alert("Login Successfully");
                navigate(`/home`);
            }else{
                window.alert("Invalid credentials")
            }
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <>
        <div className="main-frame">
            <div className="sub-frame">
            <form onSubmit={handleSubmit}>
                <p id="headp">Login </p>
            <label className="email">Enter the email:</label><br></br>
             <input type="text" placeholder="enter your email" name="emails" value={logger.emails} onChange={handleChange}></input><br></br>
            <div className="pass">
            <label className="password" name="passwords" >Enter the password:</label><br></br>
            <input type="password" placeholder="enter your password" name="passwords" value={logger.passwords} onChange={handleChange}></input><br></br>
            </div>
            <div className="sub">
            <button type="SUBMIT">Login</button>
            </div>
            </form>
            </div>
        </div>
       
        </>
    )
}

export default Login;