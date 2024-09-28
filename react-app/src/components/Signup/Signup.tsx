import dataSource from "../../services/dataSource";
import "../Login/Login.css";
import { useState, useEffect, useRef } from "react";
import { PasswordCheckService } from "../../services/passwordCheckService";
import "altcha";

// This component is used within the modal to register the user
function Signup({
  setPassReset,
  setLogin,
  setSignup,
  setMetrics,
  setLoggedIn,
  setToastShow,
  setToastMessage,
  setToastTitle,
}: any) {
  const [passwordOne, passwordOneSet] = useState(""); 
  const [passwordTwo, passwordTwoSet] = useState(""); // Used to verify password was typed correctly
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [email, emailSet] = useState("");
  const [passValidMessage, setPassValidMessage] = useState("");

  // Challenge URL from environment vars
  const altchaURL = process.env.REACT_APP_ALTCHA as string; 

  useEffect(() => {
    setPasswordsMatch(passwordOne === passwordTwo); // Checks password missmatch in real-time
  }, [passwordOne, passwordTwo]);

  // Update email as user types it
  const updateEmail = (e: any) => {
    emailSet(e.target.value);
  };

  // Checks the strength of password
  const checkPass = (password: string) => {
    const passwordStength = passwordCheck.checkPasswordStrength(password);
    if (passwordStength === 0) {
      setPassValidMessage("Password too short"); // Set real-time message
      return false;
    } else if (passwordStength === 1) {
      setPassValidMessage("Password too common"); // Set real-time message
      return false;
    } else if (passwordStength === 2) {
      setPassValidMessage("Password too weak"); // Set real-time message
      return false;
    } else {
      setPassValidMessage(""); // Remove real-time message
      return true;
    }
  };

  // Update password as user types it
  const updatePasswordOne = (e: any) => {
    passwordOneSet(e.target.value);
    checkPass(e.target.value); // Check password strength
  };

  // Update the 'verify' password as user types it
  const updatePasswordTwo = (e: any) => {
    // If first password is strong, allow user to type in second password field
    if (checkPass(passwordOne)) {
      passwordTwoSet(e.target.value);
      if (passwordOne !== e.target.value && passwordOne !== "") {
        setPassValidMessage("Passwords don't match");
      } else {
        setPassValidMessage("");
      }
    } else {
    }
  };

  // Switch to login component
  const handleLogin = () => {
    setSignup(false); // Remove signup component
    setLogin(true); // display login component
  };

  // Initialize passwordCheck Service
  const passwordCheck = new PasswordCheckService();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    console.log(e.target[4].value);

    const passwordStength = passwordCheck.checkPasswordStrength(passwordOne);

    console.log(passwordOne);
    console.log(passwordTwo);
    console.log(passwordStength);

    if (passwordOne === passwordTwo && passwordStength > 2) {
      console.log("password match");
      let payload = { email: email, password: passwordTwo };
      let result;
      // Create user
      try {
        result = await dataSource.post("/createUser", payload);
        console.log(result);
        if (result.data.message === "Success") {
          // Display Toast
          setToastTitle("Message");
          setToastMessage("Account has been registered");
          setToastShow(true);
          // Authenticate user after success
          const authenticate = await dataSource.post(
            "/authenticateUser",
            payload
          );
          if (authenticate.data.message == "Success") {
            localStorage.setItem("token", authenticate.data.token);
            console.log("Set cookie");
            setLoggedIn(true); // tell app the user is signed up
            setMetrics(true); // Display metrics component
            setSignup(false); // Remove sign up component
          }
        } else {
        }
      } catch (e) {
        console.log(e);
        // Display toast
        setToastTitle("Error");
        setToastMessage("Failed to create user");
        setToastShow(true);
      }
    } else {
      // Display toast
      setToastMessage("Passwords don't match");
      setToastTitle("Error");
      setToastShow(true);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSignup}>
        <div className="input-box">
          <div className="d-flex justify-content-left">
            <h1 className="main-header">
              Save your
              <br />
              Cities.
            </h1>
          </div>

          <div className="form-group d-flex justify-content-center">
            <input
              required
              className="form-control"
              type="email"
              id="email"
              value={email}
              onChange={updateEmail}
              placeholder="Email"
            ></input>
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
          <altcha-widget challengeurl={altchaURL}></altcha-widget>
          <div className="form-group d-flex justify-content-end">
            <button
              type="submit"
              className={
                passwordsMatch
                  ? "btn btn-outline-custom login-btn"
                  : "btn btn-outline-custom login-btn grayed"
              }
            >
              Sign up
            </button>
          </div>
        </div>

        <div className="form-group d-flex justify-content-left ">
          <a className="sign-up" href="#" onClick={handleLogin}>
            Log in
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
