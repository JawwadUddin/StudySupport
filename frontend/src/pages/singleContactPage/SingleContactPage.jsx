import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./singleContactPage.scss";
import { useParams } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import InfoTable from "../../components/infoTable/InfoTable";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

const SingleContactPage = () => {
  let { contactID } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/family/${contactID}`
        );
        if (serverResponse.message === "OK") {
          setContact(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchStudentData = async () => {
      try {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/family/${contactID}/students`
        );
        if (serverResponse.message === "OK") {
          setStudents(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchContactData();
    fetchStudentData();
  }, [contactID]);

  return (
    <div className="singleContactPageContainer">
      <h2 className="title">{contact.fullName}</h2>
      <Grid container>
        <Grid item xs={12} md={8}>
          <div className="listContainer">
            <div className="listHeader">
              <div className="listTitle">Contact Information</div>
              <Button
                onClick={() =>
                  navigate(`/contacts/${contactID}/edit`, {
                    state: { contactInfo: contact, familyID: contactID },
                  })
                }
                variant="outlined"
                color="secondary"
                className="editBtn"
              >
                Edit Contact
              </Button>
            </div>
            <InfoTable data={contact} type="contact" />
          </div>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <div className="listContainer">
            <div className="listHeader">
              <div className="listTitle">Students Information</div>
              <Button
                onClick={() =>
                  navigate("/students/new", { state: { familyID: contactID } })
                }
                variant="contained"
                className="createBtn"
              >
                Add Students
              </Button>
            </div>
            <List>
              {students.length !== 0 ? (
                students.map((student) => {
                  return (
                    <ListItemText
                      sx={{ mb: 2 }}
                      primary={student.fullName}
                      secondary={"Year " + student.schoolYear}
                    />
                  );
                })
              ) : (
                <div style={{ color: "red" }}>
                  This contact has no students.
                </div>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleContactPage;
