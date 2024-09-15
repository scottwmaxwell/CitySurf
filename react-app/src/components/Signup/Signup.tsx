import dataSource from "../../dataSource";
import "../Login/Login.css"
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";

function Signup({setPassReset, setLogin, setSignup, setMetrics, setLoggedIn, setShowToast, setToastMessage, setToastTitle}: any){

    const [passwordOne, passwordOneSet] = useState("");
    const [passwordTwo, passwordTwoSet] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [email, emailSet] = useState("");

    useEffect(()=>{
        setPasswordsMatch(passwordOne === passwordTwo);
    }, [passwordOne, passwordTwo])

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

    const handleSignup = async(e: any)=>{
        e.preventDefault();

        if(passwordOne === passwordTwo){
            console.log("password match")

            let payload = {"email": email, "password": passwordTwo}

            let result;
            // Create user
            try{
                result = await dataSource.post('/createUser', payload);
                setToastTitle("Message");
                setToastMessage("Account has been registered");
                setShowToast(true);
            }catch(e){
                console.log(e);
                setToastTitle("Failed to create User")
                setShowToast(true);
            }

            if(result){
                // Login user
                try{
                    let result = await dataSource.post("/authenticateUser", payload)
                    console.log(result.data);
                    console.log(result.data.message)
                    if(result.data.message == "Success"){
                        Cookies.set("token", result.data.token, {expires: 7});
                        console.log("Set cookie")
                        setLoggedIn(true);
                        setMetrics(true);
                        setSignup(false);
                    }
                }catch{
                    console.log("Cannot Signup: ", e);
                    setToastMessage("Email already in use");
                    setToastTitle("Error")
                    setShowToast(true);
                }
            }
        }else{
            console.log("passwords don't match")
            setToastMessage("Passwords don't match");
            setToastTitle("Error")
            setShowToast(true);
        }
    }

    //d-flex justify-content-center
    return(<div>
        <div className="form">

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
                    <button type="button" onClick={handleSignup} className={passwordsMatch? "btn btn-outline-custom login-btn": "btn btn-outline-custom login-btn grayed" }>Sign up</button>
                </div>
            </div>

            <div className="form-group d-flex justify-content-left ">
                <a className="sign-up" href="#" onClick={handleLogin}>Log in</a>
            </div>
        </div>
    </div>)
}

export default Signup;