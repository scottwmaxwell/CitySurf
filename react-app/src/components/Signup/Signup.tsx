import "../Login/Login.css"
import { useState } from 'react';

function Signup({setPassReset, setLogin, setSignup, setMetrics}: any){

    const [passwordOne, passwordOneSet] = useState("");
    const [passwordTwo, passwordTwoSet] = useState("");
    const [email, emailSet] = useState("");

    const updateEmail = (e: any) =>{
        emailSet(e.target.value);
    }

    const updatePasswordOne = (e: any) =>{
        passwordOneSet(e.target.value);
    }

    const updatePasswordTwo = (e: any) =>{
        passwordTwoSet(e.target.value);
    }

    const handleLogin = ()=>{
        setSignup(false);
        setLogin(true);
    }

    const handleSignup = (e: any)=>{
        e.preventDefault();

        if(passwordOne == passwordTwo){
            console.log("password match")
        }else{
            console.log("passwords don't match")
        }

        //TODO pass credentials up to parent
        setSignup(false);
        setMetrics(true);
    }

    //d-flex justify-content-center
    return(<div>
        <form className="form">

            <div className="input-box">

            <div className="d-flex justify-content-left">
            <h1 className="main-header">Save Your<br />Cities.</h1>
        </div>

                <div className="form-group d-flex justify-content-center">
                    <input required className="form-control" type="email" id="email" value={email} onChange={updateEmail} placeholder="Email"></input>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input required className="form-control input-form" type="password" id="password" value={passwordOne} onChange={updatePasswordOne} placeholder="Password"></input>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input required className="form-control input-form" type="password" id="passwordverify" value={passwordTwo} onChange={updatePasswordTwo} placeholder="Verify Password"></input>
                </div>

                <div className="form-group d-flex justify-content-end">
                    <button onClick={handleSignup} type="submit" className="btn btn-outline-custom login-btn">Sign up</button>
                </div>
            </div>

            <div className="form-group d-flex justify-content-left">
                <a className="sign-up" href="#" onClick={handleLogin}>Log in</a>
            </div>
        </form>
    </div>)
}

export default Signup;