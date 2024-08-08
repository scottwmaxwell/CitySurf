import "../Login/Login.css"
import {useState} from 'react';

function Passreset({setPassReset, setLogin, setModalOpen}: any){

    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [codeSubmitted, setCodeSubmitted] = useState(false);
    const [passwordOne, passwordOneSet] = useState("");
    const [passwordTwo, passwordTwoSet] = useState("");
    
    const updatePasswordOne = (e: any) =>{
        passwordOneSet(e.target.value);
    }

    const updatePasswordTwo = (e: any) =>{
        passwordTwoSet(e.target.value);
    }

    const handleChangePassword = (e: any)=>{
        e.preventDefault();

        if(passwordOne === passwordTwo){
            console.log("password match")
            setModalOpen(false);
        }else{
            console.log("passwords don't match")
        }

        //TODO pass credentials to backend
    }

    const handlePassReset = (e:any)=>{
        e.preventDefault();
        console.log("Password reset started");
        setEmailSubmitted(true);
    }


    const handleCode = (e:any)=>{
        e.preventDefault();
        console.log("Code set");
        setCodeSubmitted(true);
    }

    const handleLogin = (e: any)=>{
        e.preventDefault();
        setPassReset(false);
        setLogin(true);
    }

    //d-flex justify-content-center
    return(<div>   

        {!emailSubmitted &&
        <form className="form" onSubmit={handlePassReset}>

            <div className="input-box">

                <div className="d-flex justify-content-left">
                    <h1 className="main-header">Reset Your<br />Password.</h1>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input required className="form-control" type="email" id="email" placeholder="Email"></input>
                </div>
                
                <div className="form-group d-flex justify-content-end">
                    <button type="submit" className="btn btn-outline-custom login-btn">Reset Password</button>
                </div>
                
            </div>

            <div className="form-group d-flex justify-content-left">
                <a className="sign-up" href="#" onClick={handleLogin}>Login</a>
            </div>
        </form>
        }

        {emailSubmitted && !codeSubmitted &&
            <form className="form" onSubmit={handleCode}>

            <div className="input-box">

                <div className="d-flex justify-content-left">
                    <h1 className="main-header">Enter Your<br />Code.</h1>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input required className="form-control" type="code" id="code" placeholder="Code"></input>
                </div>
                
                <div className="form-group d-flex justify-content-end">
                    <button type="submit" className="btn btn-outline-custom login-btn">Enter Code</button>
                </div>
                
            </div>

            <div className="form-group d-flex justify-content-left">
                <a className="sign-up" href="#" onClick={handleLogin}>Login</a>
            </div>
        </form>
        }

        {codeSubmitted &&
        <form onSubmit={handleChangePassword} className="form">

        <div className="input-box">

        <div className="d-flex justify-content-left">
        <h1 className="main-header">Enter Your New<br />Password.</h1>
        </div>
            <div className="form-group d-flex justify-content-center">
                <input required className="form-control input-form" type="password" id="password" value={passwordOne} onChange={updatePasswordOne} placeholder="Password"></input>
            </div>

            <div className="form-group d-flex justify-content-center">
                <input required className="form-control input-form" type="password" id="passwordverify" value={passwordTwo} onChange={updatePasswordTwo} placeholder="Verify Password"></input>
            </div>

            <div className="form-group d-flex justify-content-end">
                <button type="submit" className="btn btn-outline-custom login-btn">Change Password</button>
            </div>
        </div>

        <div className="form-group d-flex justify-content-left">
            <a className="sign-up" href="#" onClick={handleLogin}>Log in</a>
        </div>
    </form>
        }

    </div>)
}

export default Passreset;