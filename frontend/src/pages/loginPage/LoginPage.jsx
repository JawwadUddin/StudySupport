import React, { useState } from "react";
import "./loginPage.css";
import { saveData } from "../../helpers/apiFunctions";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    try {
      if (username === "" || password === "") {
        console.log("Form not complete");
        return;
      }
      async function submitData() {
        const serverResponse = await saveData(
          `${process.env.REACT_APP_API_URL}/login`,
          { username, password }
        );
        if (serverResponse.message === "OK") {
          console.log("yes");
          if (
            signIn({
              token: serverResponse.results.data,
              expiresIn: 60,
              tokenType: "Bearer",
              authState: { user: username },
            })
          ) {
            navigate("/");
          } else console.log("cannot sign you in");
        } else {
          console.log(serverResponse);
          throw Error(serverResponse.message);
        }
      }
      submitData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="loginPageContainer">
      <div class="login-box">
        <h2>Login</h2>
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
          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
