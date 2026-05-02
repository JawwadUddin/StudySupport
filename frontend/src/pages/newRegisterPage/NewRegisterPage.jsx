import RegisterForm from "../../components/registerForm/RegisterForm";
import "../registerPage/registerPage.css";

const NewRegisterPage = () => {
  return (
    <div className="registerPageContainer">
      <div className="pageHeader">
        <div className="headerLeft">
          <h2>New Register</h2>
          <div className="subtitle">Create a new attendance register</div>
        </div>
      </div>
      <div className="formContainer margin-0">
        <RegisterForm />
      </div>
    </div>
  );
};

export default NewRegisterPage;
