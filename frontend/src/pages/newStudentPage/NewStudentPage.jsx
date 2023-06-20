import "./newStudentPage.css";
import StudentForm from "../../components/studentForm/StudentForm";
import { useLocation } from "react-router-dom";

const NewStudentPage = () => {
  const location = useLocation();
  const familyID = location.state ? location.state.familyID : "";
  const studentID = location.state ? location.state.studentID : "";

  return (
    <div className="newStudentPageContainer">
      <h2 className="title">{studentID ? "Edit Student" : "New Student"}</h2>
      <div className="formContainer">
        <StudentForm idFamily={familyID} />
      </div>
    </div>
  );
};

export default NewStudentPage;
