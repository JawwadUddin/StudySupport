import React from "react";
import RegisterForm from "../../components/registerForm/RegisterForm";
import "./newRegisterPage.css";

const NewRegisterPage = () => {
  return (
    <div className="newRegisterPageContainer">
      <h2 className="title">New Register</h2>
      <div className="formContainer">
        <RegisterForm />
      </div>
    </div>
  );
};

export default NewRegisterPage;
