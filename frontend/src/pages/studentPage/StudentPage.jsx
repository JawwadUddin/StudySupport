import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./studentPage.scss";
import Table from "../../components/table/Table";
import { getData } from "../../helpers/apiFunctions";
import Button from "@mui/material/Button";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/student`
        );
        if (serverResponse.message === "OK") {
          setStudents(serverResponse.results.data);
        }
      }
      fetchData();
      console.log(students);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="studentPageContainer">
      <h2 className="title">Students</h2>
      <div className="listContainer">
        <div className="listHeader">
          <div className="listTitle">All Students</div>
          <Button
            onClick={() => navigate("/students/new")}
            variant="contained"
            className="createBtn"
          >
            Create New Student
          </Button>
        </div>
        <Table data={students} type="student" />
      </div>
    </div>
  );
};

export default StudentPage;
