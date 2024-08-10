import "../Login/Login.css"
import { useState, useEffect } from 'react';

function Signup({setPassReset, setLogin, setSignup, setMetrics}: any){

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

    const handleSignup = (e: any)=>{
        e.preventDefault();

        if(passwordOne === passwordTwo){
            console.log("password match")
            setMetrics(true);
            setSignup(false);
        }else{
            console.log("passwords don't match")
        }
    }

    //d-flex justify-content-center
    return(<div>
        <form onSubmit={handleSignup} className="form">

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
                    <button type="submit" className={passwordsMatch? "btn btn-outline-custom login-btn": "btn btn-outline-custom login-btn grayed" }>Sign up</button>
                </div>
            </div>

            <div className="form-group d-flex justify-content-left ">
                <a className="sign-up" href="#" onClick={handleLogin}>Log in</a>
            </div>
        </form>
    </div>)
}

export default Signup;