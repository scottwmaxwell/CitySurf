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

  // User clicks sign up link
  const handleSignUp = () => {
    setSignup(true); // Display Signup component
    setLogin(false); // Remove login component
  };

  // User clicks password reset link
  const handlePassReset = () => {
    setLogin(false); // Remove login copmonent
    setPassReset(true); // Display password reset component
  };

  // User submit login
  const handleLogin = async (e: any) => {
    e.preventDefault();
    let payload = { email: email, password: password };
    try {
      // Authenticate user via API call
      let result = await dataSource.post("/authenticateUser", payload);
      if (result.data.message === "Success") {
        localStorage.setItem('token', result.data.token); // Save session in local storage
        setLoggedIn(true); // Alert app to login status
        // Diplay Toast
        setToastShow(true); 
        setToastTitle("Message");
        setToastMessage("You have been logged in");
        setModalOpen(false); // Remove modal component
      }
    } catch {
      console.log(e);
      // Display Toast
      setToastShow(true);
      setToastTitle("Error: Cannot Login");
      setToastMessage("Email or Password incorrect.");
    }
  };

  // Update email as user types
  const updateEmail = (e: any) => {
    setEmail(e.currentTarget.value);
  };

  // Update password as user types
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
