import React from "react";
import "./scorePage.css";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "../../helpers/apiFunctions";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

const ScorePage = () => {
  let { studentID, testName } = useParams();
  const location = useLocation();
  const testID = location.state ? location.state.testID : null;
  const [scores, setScores] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/score/${studentID}/${testID}`
        );
        if (serverResponse.message === "OK") {
          setScores(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [studentID, testID]);

  return (
    <div className="scorePageContainer">
      <h2 className="title">{testName}</h2>
      {scores.length !== 0 ? (
        <div className="listContainer">
          <div className="listHeader">
            <div className="listTitle">Score Information</div>
            {/* <Button
              onClick={() =>
                navigate(`edit`, {
                  state: { scoreInfo: scores },
                })
              }
              variant="outlined"
              color="secondary"
              className="editBtn"
            >
              Edit Scores
            </Button> */}
          </div>
          <Table>
            <TableHead>
              <TableCell sx={{ fontWeight: "bold" }}>Q</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Topic Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Difficulty</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
            </TableHead>
            <TableBody>
              {scores.map((score, index) => {
                return (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{score.topicName}</TableCell>
                    <TableCell>{score.difficulty}</TableCell>
                    <TableCell>{`${score.marksReceived} / ${score.marks}`}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <h2 className="title">Scores not found</h2>
      )}
    </div>
  );
};

export default ScorePage;
