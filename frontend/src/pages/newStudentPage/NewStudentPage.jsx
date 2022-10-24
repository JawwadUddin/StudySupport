import "./newStudentPage.scss";
import StudentForm from "../../components/studentForm/StudentForm";

const NewStudentPage = () => {
  return (
    <div className="newStudentPageContainer">
      <h2 className="title">New Student</h2>
      <div className="formContainer">
        <StudentForm />
      </div>
    </div>
  );
};

export default NewStudentPage;
