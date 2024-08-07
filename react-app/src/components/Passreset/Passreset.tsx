import "../Login/Login.css"

function Passreset({setPassReset, setLogin, setSignup}: any){

    const handleSignUp = ()=>{
        setSignup(true);
        setLogin(false);
    }

    const handlePassReset = ()=>{
        setLogin(false);
        setPassReset(true);
    }

    const handleLogin = (e: any)=>{
        e.preventDefault();
    }

    //d-flex justify-content-center
    return(<div>   
        <form className="form" onSubmit={handleLogin}>

            <div className="input-box">

                <div className="d-flex justify-content-left">
                    <h1 className="main-header">Reset Your<br />Password.</h1>
                </div>
                <div className="form-group d-flex justify-content-center">
                    <input required className="form-control" type="email" id="email" placeholder="Email"></input>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input required className="form-control input-form" type="password" id="password" placeholder="Password"></input>
                </div>

                <div className="form-group d-flex justify-content-end">
                    <button type="submit" className="btn btn-outline-custom login-btn">Reset Password</button>
                </div>
            </div>

            <div className="form-group d-flex justify-content-left">
                <a className="sign-up" href="#" onClick={handleLogin}>Login</a>
            </div>
        </form>
    </div>)
}

export default Passreset;