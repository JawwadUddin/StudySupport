import React, { useState } from "react";
import "./loginPage.css";
import { saveData } from "../../helpers/apiFunctions";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const LoginPage = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (username === "" || password === "") {
        console.log("Form not complete");
        return;
      }
      async function submitData() {
        setLoading(true);
        const serverResponse = await saveData(
          `${process.env.REACT_APP_API_URL}/login`,
          { username, password }
        );
        setLoading(false);
        if (serverResponse.message === "OK") {
          if (
            signIn({
              token: serverResponse.results.data,
              expiresIn: 60,
              tokenType: "Bearer",
              authState: { user: username },
            })
          ) {
            navigate("/");
          } else {
            throw Error({ message: "Error with Sign In Package" });
          }
        } else {
          throw Error(serverResponse.message);
        }
      }
      submitData().catch((error) => {
        setError(error.message);
      });
    } catch (err) {
      console.log("here");
      setError(err.message);
    }
  }

  return (
    <div className="loginPageContainer">
      <div class="login-box">
        <form>
          <h2>Login</h2>
          {error ? <div className="error-message">{error}</div> : null}
          <div class="user-box">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="login-submit">
            {loading ? (
              <CircularProgress />
            ) : (
              <button onClick={(e) => handleSubmit(e)}>Submit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
