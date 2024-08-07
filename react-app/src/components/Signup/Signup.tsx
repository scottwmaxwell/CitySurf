import "../Login/Login.css"

function Signup({setPassReset, setLogin, setSignup, setMetrics}: any){

    const handleLogin = ()=>{
        setSignup(false);
        setLogin(true);
    }

    const handleSignup = (e: any)=>{
        e.preventDefault();

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
                    <input required className="form-control" type="email" id="email" placeholder="Email"></input>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input required className="form-control input-form" type="password" id="password" placeholder="Password"></input>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input required className="form-control input-form" type="password" id="password" placeholder="Verify Password"></input>
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