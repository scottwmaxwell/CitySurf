import "../Login/Login.css";
import { useState } from "react";
import dataSource from "../../services/dataSource";
import { PasswordCheckService } from "../../services/passwordCheckService";

// This component displays a reset form so the user can attempt to reset their password
function Passreset({ setPassReset, setLogin, setModalOpen, setToastShow, setToastMessage, setToastTitle}: any) {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordOne, passwordOneSet] = useState("");
  const [passwordTwo, passwordTwoSet] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [passValidMessage, setPassValidMessage] = useState("");

  const updateEmail = (e: any) =>{
    setEmail(e.target.value);
  }

  const updatePasswordOne = (e: any) => {
    passwordOneSet(e.target.value);
    checkPass(e.target.value);
  };

  const updatePasswordTwo = (e: any) => {
    if (checkPass(passwordOne)) {
      passwordTwoSet(e.target.value);
      if (passwordOne !== e.target.value && passwordOne !== "") {
        setPassValidMessage("Passwords don't match");
      } else {
        setPassValidMessage("");
      }
    }
  };

  const checkPass = (password: string) => {
    const passwordStength = passwordCheck.checkPasswordStrength(password);
    if (passwordStength === 0) {
      setPassValidMessage("Password too short");
      return false;
    } else if (passwordStength === 1) {
      setPassValidMessage("Password too common");
      return false;
    } else if (passwordStength === 2) {
      setPassValidMessage("Password too weak");
      return false;
    } else {
      setPassValidMessage("");
      return true;
    }
  };

  const passwordCheck = new PasswordCheckService();

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    const passwordStength = passwordCheck.checkPasswordStrength(passwordOne);
    if (passwordOne === passwordTwo && passwordStength > 3) {
      const payload = { password: passwordTwo }
      try{
        const result = await dataSource.put("/passwordReset", payload,{
          headers: {
            Authorization: `Bearer ${resetToken}`,
          }
        });
        if(result.data.message === "Success"){
          setResetToken("");
          setToastTitle("Message");
          setToastMessage("Password has been reset");
          setToastShow(true);
          setPassReset(false);
          setLogin(true);
        }
      }catch(e){
        console.log(e);
        setToastTitle("Error");
        setToastMessage("Failed to reset password");
        setToastShow(true);
      }
    } else {
      console.log("passwords don't match");
      setToastMessage("Passwords don't match");
      setToastTitle("Error");
      setToastShow(true);
    }
  };

  const handlePassReset = async (e: any) => {
    e.preventDefault();
    console.log("Password reset started");
    const result = await dataSource(`/requestReset?email=${email}`);
    if(result){
      setToastMessage(result.data.message)
      setToastTitle("Check your email");
      setToastShow(true);
      setEmailSubmitted(true);
    }
  };

  const handleCode = async (e: any) => {
    e.preventDefault();
    console.log("Code set");
    const code = e.target[0].value;
    try{
      const result = await dataSource(`/resetAuthorize?email=${email}&resetCode=${code}`);
      if(result){
        console.log(result.data.token)
        setResetToken(result.data.token);
        setCodeSubmitted(true);
      }
    }catch(e){
      setToastMessage("Incorrect Code. Try Again.");
      setToastTitle("Error");
      setToastShow(true);
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    setPassReset(false);
    setLogin(true);
  };

  //d-flex justify-content-center
  return (
    <div>
      {!emailSubmitted && (
        <form className="form" onSubmit={handlePassReset}>
          <div className="input-box">
            <div className="d-flex justify-content-left">
              <h1 className="main-header">
                Reset Your
                <br />
                Password.
              </h1>
            </div>

            <div className="form-group d-flex justify-content-center">
              <input
                required
                className="form-control"
                type="email"
                id="email"
                onChange={updateEmail}
                placeholder="Email"
              ></input>
            </div>

            <div className="form-group d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-outline-custom login-btn"
              >
                Reset Password
              </button>
            </div>
          </div>

          <div className="form-group d-flex justify-content-left">
            <button className="sign-up btn btn-link" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
      )}

      {emailSubmitted && !codeSubmitted && (
        <form className="form" onSubmit={handleCode}>
          <div className="input-box">
            <div className="d-flex justify-content-left">
              <h1 className="main-header">
                Enter Your
                <br />
                Code.
              </h1>
            </div>

            <div className="form-group d-flex justify-content-center">
              <input
                required
                className="form-control"
                type="code"
                id="code"
                placeholder="Code"
              ></input>
            </div>

            <div className="form-group d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-outline-custom login-btn"
              >
                Enter Code
              </button>
            </div>
          </div>

          <div className="form-group d-flex justify-content-left">
            <a className="sign-up" href="#" onClick={handleLogin}>
              Login
            </a>
          </div>
        </form>
      )}

      {codeSubmitted && (
        <form onSubmit={handleChangePassword} className="form">
          <div className="input-box">
            <div className="d-flex justify-content-left">
              <h1 className="main-header">
                Enter Your New
                <br />
                Password.
              </h1>
            </div>
            <div className="form-group d-flex justify-content-center">
              <input
                required
                className="form-control input-form"
                type="password"
                id="password"
                value={passwordOne}
                onChange={updatePasswordOne}
                placeholder="Password"
              ></input>
            </div>

            <div className="form-group d-flex justify-content-center">
              <input
                required
                className="form-control input-form"
                type="password"
                id="passwordverify"
                value={passwordTwo}
                onChange={updatePasswordTwo}
                placeholder="Verify Password"
              ></input>
            </div>
            <p className="text-warning">{passValidMessage}</p>
            <div className="form-group d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-outline-custom login-btn"
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="form-group d-flex justify-content-left">
            <a className="sign-up" href="#" onClick={handleLogin}>
              Log in
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

export default Passreset;
