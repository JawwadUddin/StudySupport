import "./scorePage.css";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData, updateData } from "../../helpers/apiFunctions";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { status } from "../../helpers/status";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const ScorePage = () => {
  let { studentID, testName } = useParams();
  const location = useLocation();
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [marksReceived, setMarksReceived] = useState("");
  const testID = location.state ? location.state.testID : null;
  const [scores, setScores] = useState([]);
  const [testComment, setTestComment] = useState({});
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/score/${studentID}/${testID}`
        );
        if (serverResponse.message === "OK") {
          setRefresh(false);
          setScores(serverResponse.results.data.scores);
          setTestComment(serverResponse.results.data.testComment);
        } else {
          throw Error(serverResponse.message);
        }
      }
      if (refresh) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [studentID, testID, refresh]);

  const editScoreMode = (score) => {
    setCurrentlyEditing(true);
    setMarksReceived(score.marksReceived);
    const updatedScoreArray = scores.map((item) => {
      if (item.id !== score.id) {
        return item;
      } else {
        return { ...score, edit: true };
      }
    });
    setScores((prev) => updatedScoreArray);
  };

  const cancelEdit = (score) => {
    const updatedScoreArray = scores.map((item) => {
      if (item.id !== score.id) {
        return item;
      } else {
        return { ...score, edit: false };
      }
    });
    setScores((prev) => updatedScoreArray);
    setCurrentlyEditing(false);
  };

  const editScore = (score) => {
    try {
      async function editData() {
        if (marksReceived === "") return;
        console.log(score.id, marksReceived);
        const serverResponse = await updateData(
          `${process.env.REACT_APP_API_URL}/api/score/${score.id}`,
          {
            marksReceived: marksReceived,
          }
        );
        if (serverResponse.message === "OK") {
          setCurrentlyEditing(false);
          setRefresh(true);
        } else {
          throw Error(serverResponse.message);
        }
      }
      editData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="scorePageContainer">
      <h2 className="title">{testName}</h2>
      {scores.length !== 0 ? (
        <div className="listContainer">
          <div className="listHeader">
            <div className="listTitle">Score Information</div>
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
                  <TableRow
                    key={index}
                    className={status(score.marksReceived, score.marks)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{score.topicName}</TableCell>
                    <TableCell>{score.difficulty}</TableCell>
                    {score.edit ? (
                      <TableCell>
                        <input
                          className="scoreInput"
                          type="number"
                          value={marksReceived}
                          onChange={(e) => setMarksReceived(e.target.value)}
                        ></input>{" "}
                        {" / " + score.marks}
                      </TableCell>
                    ) : (
                      <TableCell>{`${score.marksReceived} / ${score.marks}`}</TableCell>
                    )}
                    {score.edit ? (
                      <TableCell align="right">
                        <IconButton
                          onClick={() => cancelEdit(score)}
                          aria-label="cancel-edit"
                          color="error"
                        >
                          <CloseIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => editScore(score)}
                          aria-label="confirm-edit"
                          color="success"
                        >
                          <CheckIcon />
                        </IconButton>
                      </TableCell>
                    ) : (
                      <TableCell align="right">
                        <IconButton
                          onClick={() =>
                            !currentlyEditing && editScoreMode(score)
                          }
                          aria-label="edit"
                          color="secondary"
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="listHeader" style={{ marginTop: "50px" }}>
            <div className="listTitle">Test Comment</div>
          </div>
          <div className="comment">
            {testComment && <p>{testComment.comment}</p>}
          </div>
        </div>
      ) : (
        <h2 className="title">Scores not found</h2>
      )}
    </div>
  );
};

export default ScorePage;
