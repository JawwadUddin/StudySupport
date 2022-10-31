import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import "./singleStudentPage.scss";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InfoTable from "../../components/infoTable/InfoTable";

const SingleStudentPage = () => {
  let { studentID } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({});
  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/student/${studentID}`
        );
        if (serverResponse.message === "OK") {
          setStudent(serverResponse.results.data);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [studentID]);

  return (
    <div className="singleStudentPageContainer">
      <h2 className="title">{student.fullName}</h2>
      <Grid container>
        <Grid item xs={12} md={8}>
          <div className="listContainer">
            <div className="listHeader">
              <div className="listTitle">Student Information</div>
              <Button
                onClick={() => navigate(`/contacts/${student.familyID}`)}
                variant="outlined"
                className="viewBtn"
              >
                View Contact
              </Button>
              <Button
                onClick={() =>
                  navigate(`/students/${studentID}/edit`, {
                    state: { studentInfo: student, studentID: studentID },
                  })
                }
                variant="outlined"
                color="secondary"
                className="editBtn"
              >
                Edit Student
              </Button>
            </div>
            <InfoTable data={student} type="student" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleStudentPage;
