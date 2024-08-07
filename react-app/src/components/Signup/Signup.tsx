import "./Signup.css"

function Signup({setPassReset, setLogin, setSignup}: any){

    const handleLogin = ()=>{
        setSignup(false);
        setLogin(true);
    }

    //d-flex justify-content-center
    return(<div>
        
        <div className="d-flex justify-content-center">
            <h1 className="">Save Your<br />Cities.</h1>
        </div>
       
        <form className="form">

            <div className="input-box">
                <div className="form-group d-flex justify-content-center">
                    <input className="form-control" type="email" id="email" placeholder="Email"></input>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input className="form-control input-form" type="password" id="password" placeholder="Password"></input>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input className="form-control input-form" type="password" id="password" placeholder="Verify Password"></input>
                </div>

                <div className="form-group d-flex justify-content-end">
                    <button type="submit" className="btn btn-outline-custom login-btn">Sign up</button>
                </div>
            </div>

            <div className="form-group d-flex justify-content-left">
                <a className="sign-up" href="#" onClick={handleLogin}>Log in</a>
            </div>
        </form>
    </div>)
}

export default Signup;