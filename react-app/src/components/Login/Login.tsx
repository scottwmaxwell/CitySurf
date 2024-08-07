import "./Login.css"

function Login({setPassReset, setLogin, setSignup}: any){

    const handleSignUp = ()=>{
        setSignup(true);
        setLogin(false);
    }

    const handlePassReset = ()=>{

    }

    //d-flex justify-content-center
    return(<div>   
        <form className="form">

            <div className="input-box">

                <div className="d-flex justify-content-left">
                    <h1 className="main-header">View Your<br />Cities.</h1>
                </div>
                <div className="form-group d-flex justify-content-center">
                    <input required className="form-control" type="email" id="email" placeholder="Email"></input>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input required className="form-control input-form" type="password" id="password" placeholder="Password"></input>
                </div>

                <div className="form-group d-flex justify-content-end">
                    <button type="submit" className="btn btn-outline-custom login-btn">Login</button>
                </div>
            </div>

            <div className="form-group d-flex justify-content-left">
                <a className="sign-up" href="#" onClick={handleSignUp}>Sign Up</a>
            </div>
            <div className="form-group d-flex justify-content-left">
                <a className="sign-up" href="#" onClick={handleSignUp}>Forgot Password?</a>
            </div>
        </form>
    </div>)
}

export default Login;