import { useState } from "react";
import "./Login.css";
import dataSource from "../../services/dataSource";

// This component displays the login form
function Login({
  setPassReset,
  setLogin,
  setSignup,
  setModalOpen,
  setLoggedIn,
  setToastShow,
  setToastMessage,
  setToastTitle,
}: any) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSignUp = () => {
    setSignup(true);
    setLogin(false);
  };

  const handlePassReset = () => {
    setLogin(false);
    setPassReset(true);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    let payload = { email: email, password: password };
    try {
      let result = await dataSource.post("/authenticateUser", payload);
      console.log(result.data);
      console.log(result.data.message);
      if (result.data.message === "Success") {
        localStorage.setItem('token', result.data.token);
        setLoggedIn(true);
        setToastShow(true);
        setToastTitle("Message");
        setToastMessage("You have been logged in");
        setModalOpen(false);
      }
    } catch {
      console.log("Cannot login: ", e);
      setToastShow(true);
      setToastTitle("Error: Cannot Login");
      setToastMessage("Email or Password incorrect.");
    }
  };

  const updateEmail = (e: any) => {
    setEmail(e.currentTarget.value);
  };

  const updatePassword = (e: any) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div>
      <form className="form" onSubmit={handleLogin}>
        <div className="input-box">
          <div className="d-flex justify-content-left">
            <h1 className="main-header">
              View Your
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
              value={password}
              onChange={updatePassword}
              placeholder="Password"
            ></input>
          </div>

          <div className="form-group d-flex justify-content-end">
            <button type="submit" className="btn btn-outline-custom login-btn">
              Login
            </button>
          </div>
        </div>

        <div className="form-group d-flex justify-content-left">
          <button className="sign-up btn btn-link" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
        <div className="form-group d-flex justify-content-left">
          <button className="sign-up btn btn-link" onClick={handlePassReset}>
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
