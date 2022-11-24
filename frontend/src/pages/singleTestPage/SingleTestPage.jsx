import React from "react";
import "./singleTestPage.css";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";

const SingleTestPage = () => {
  let { testID } = useParams();
  const navigate = useNavigate();
  const { syllabusID } = useParams();
  const location = useLocation();
  const { testName, syllabusName } = location.state ? location.state : null;
  const [test, setTest] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/test/${testID}`
        );
        if (serverResponse.message === "OK") {
          setTest(serverResponse.results.data);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [testID]);

  return (
    <div className="singleTestPageContainer">
      {test.length !== 0 ? (
        <>
          <h2 className="title">{testName}</h2>
          <div className="listContainer">
            <div className="listHeader">
              <div className="listTitle">Test Information</div>
              <Button
                onClick={() =>
                  navigate(`edit`, {
                    state: {
                      syllabus: {
                        syllabusID,
                        syllabusName,
                        testInfo: test,
                        testName,
                      },
                    },
                  })
                }
                variant="outlined"
                color="secondary"
                className="editBtn"
              >
                Edit Test
              </Button>
            </div>
            <Table>
              <TableHead>
                <TableCell sx={{ fontWeight: "bold" }}>Q</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Topic Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Difficulty</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Marks</TableCell>
              </TableHead>
              <TableBody>
                {test.map((question, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{question.topicName}</TableCell>
                      <TableCell>{question.difficulty}</TableCell>
                      <TableCell>{question.marks}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <h2 className="title">Test not found</h2>
      )}
    </div>
  );
};
export default SingleTestPage;
