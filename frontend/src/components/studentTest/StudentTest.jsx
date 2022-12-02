import React from "react";
import "./studentTest.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { status } from "../../helpers/status";

const StudentTest = ({ studentID }) => {
  const navigate = useNavigate();
  const [testsCompleted, setTestsCompleted] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/test/completed/${studentID}`
        );
        if (serverResponse.message === "OK") {
          setTestsCompleted(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {testsCompleted.length !== 0 ? (
        testsCompleted.map((test) => {
          return (
            <ListItem
              onClick={() =>
                navigate(`${test.testName}`, { state: { testID: test.id } })
              }
              className="studentTestList"
            >
              <ListItemText primary={test.testName} />
              <h3
                className={status(test.marksReceived, test.marks) + " status"}
              >
                {test.marksReceived + " / " + test.marks}
              </h3>
            </ListItem>
          );
        })
      ) : (
        <div style={{ color: "red" }}>This student has no completed tests</div>
      )}
    </>
  );
};

export default StudentTest;
