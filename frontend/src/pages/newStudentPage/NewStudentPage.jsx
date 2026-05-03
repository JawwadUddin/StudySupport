import StudentForm from "../../components/studentForm/StudentForm";
import { useLocation } from "react-router-dom";

const NewStudentPage = () => {
  const location = useLocation();
  const familyID = location.state ? location.state.familyID : "";
  const studentID = location.state ? location.state.studentID : "";

  return (
    <div className="studentFormPage">
      <div className="pageHeader">
        <h2>{studentID ? "Edit Student" : "New Student"}</h2>
        <div className="subtitle">
          {studentID
            ? "Update student information"
            : "Add a new student to your records"}
        </div>
      </div>
      <div className="formCard">
        <StudentForm idFamily={familyID} />
      </div>
    </div>
  );
};

export default NewStudentPage;
