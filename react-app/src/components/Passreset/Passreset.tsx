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

  // Update email as user types
  const updateEmail = (e: any) =>{
    setEmail(e.target.value);
  }

  // Update password as user types
  const updatePasswordOne = (e: any) => {
    passwordOneSet(e.target.value);
    checkPass(e.target.value); // check password strength
  };

  // Update password as user types
  const updatePasswordTwo = (e: any) => {
    // If first password is strong, allow user to type in second password field
    if (checkPass(passwordOne)) {
      passwordTwoSet(e.target.value);
      if (passwordOne !== e.target.value && passwordOne !== "") {
        setPassValidMessage("Passwords don't match");
      } else {
        setPassValidMessage("");
      }
    }
  };

  // Checks the strength of password
  const checkPass = (password: string) => {
    const passwordStength = passwordCheck.checkPasswordStrength(password);
    if (passwordStength === 0) {
      setPassValidMessage("Password too short"); // set real-time message
      return false;
    } else if (passwordStength === 1) {
      setPassValidMessage("Password too common"); // set real-time message
      return false;
    } else if (passwordStength === 2) {
      setPassValidMessage("Password too weak"); // set real-time message
      return false;
    } else {
      setPassValidMessage(""); // remove real-time message
      return true;
    }
  };

  // Initialize passwordCheck service
  const passwordCheck = new PasswordCheckService();

  // User submits password reset
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
          setResetToken(""); // Make resetToken empty
          // Display Toast
          setToastTitle("Message");
          setToastMessage("Password has been reset");
          setToastShow(true);
          // Remove password reset component and display login
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

  // User requests to reset password
  const handlePassReset = async (e: any) => {
    e.preventDefault();

    // Send password reset code to email (if Valid)
    const result = await dataSource(`/requestReset?email=${email}`);
    if(result){
      // Display Toast
      setToastMessage(result.data.message);
      setToastTitle("Check your email");
      setToastShow(true);
      setEmailSubmitted(true);
    }
  };

  // User submits reset code
  const handleCode = async (e: any) => {
    e.preventDefault();
    const code = e.target[0].value;
    try{
      // Verify code is valid
      const result = await dataSource(`/resetAuthorize?email=${email}&resetCode=${code}`);
      if(result){
        console.log(result.data.token)
        setResetToken(result.data.token);
        setCodeSubmitted(true); // Display password fields for reset
      }
    }catch(e){
      // Display toast
      setToastMessage("Incorrect Code. Try Again.");
      setToastTitle("Error");
      setToastShow(true);
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    setPassReset(false); // Remove password component
    setLogin(true); // Show login component
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
