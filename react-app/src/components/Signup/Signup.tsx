import dataSource from "../../services/dataSource";
import "../Login/Login.css";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { PasswordCheckService } from "../../services/passwordCheckService";
import 'altcha';

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
  const [passwordTwo, passwordTwoSet] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [email, emailSet] = useState("");
  const [passValidMessage, setPassValidMessage] = useState("");

  const altchaURL = process.env.REACT_APP_ALTCHA as string; // Challenge URL

  useEffect(() => {
    setPasswordsMatch(passwordOne === passwordTwo);
  }, [passwordOne, passwordTwo]);

  const updateEmail = (e: any) => {
    emailSet(e.target.value);
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
    } else {
    }
  };

  const handleLogin = () => {
    setSignup(false);
    setLogin(true);
  };

  const passwordCheck = new PasswordCheckService();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const passwordStength = passwordCheck.checkPasswordStrength(passwordOne);

    if (passwordOne === passwordTwo && passwordStength > 3) {
      console.log("password match");
      let payload = { email: email, password: passwordTwo };
      let result;
      // Create user
      try {
        result = await dataSource.post("/createUser", payload);
        console.log(result);
        if (result.data.message === "Success") {
          console.log("here in success");
          setToastTitle("Message");
          setToastMessage("Account has been registered");
          setToastShow(true);
          // Authenticate user after success
          const authenticate = await dataSource.post(
            "/authenticateUser",
            payload
          );
          if (authenticate.data.message == "Success") {
            Cookies.set("token", authenticate.data.token, { expires: 7 });
            console.log("Set cookie");
            setLoggedIn(true);
            setMetrics(true);
            setSignup(false);
          }
        } else {
        }
      } catch (e) {
        console.log(e);
        console.log(result);
        setToastTitle("Error");
        setToastMessage("Failed to create user");
        setToastShow(true);
      }
    } else {
      console.log("passwords don't match");
      setToastMessage("Passwords don't match");
      setToastTitle("Error");
      setToastShow(true);
    }
  };

  //d-flex justify-content-center
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
