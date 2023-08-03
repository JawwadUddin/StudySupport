import RegisterForm from "../../components/registerForm/RegisterForm";
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
