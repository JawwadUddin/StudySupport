import React from "react";
import "./scoreForm.css";
import { useState, useEffect } from "react";
import { getData, saveData } from "../../helpers/apiFunctions";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";

const ScoreForm = () => {
  const { studentID } = useParams();
  const navigate = useNavigate();
  const [syllabusDropdown, setSyllabusDropdown] = useState([]);
  const [syllabusID, setSyllabusID] = useState("");
  const [testDropdown, setTestDropdown] = useState([]);
  const [testID, setTestID] = useState("");
  const [questions, setQuestions] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({
    studentID: studentID,
    testDate: "",
    scores: [],
  });

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/syllabus`
        );
        if (serverResponse.message === "OK") {
          setSyllabusDropdown(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/test`
        );
        if (serverResponse.message === "OK") {
          setTestDropdown(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/test/${testID}`
        );
        if (serverResponse.message === "OK") {
          setQuestions(serverResponse.results.data);
          let updatedScoreArray = [];
          serverResponse.results.data.forEach((item) => {
            updatedScoreArray.push({
              question_id: item.questionID,
              marks_received: 0,
            });
          });
          const updatedData = {
            ...dataToSubmit,
            scores: updatedScoreArray,
          };
          setDataToSubmit((prev) => updatedData);
        } else {
          throw Error(serverResponse.message);
        }
      }
      if (testID !== "") {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [testID]);

  const updateScore = (e, questionID) => {
    const updatedScoreArray = dataToSubmit.scores.map((score) => {
      if (score.question_id !== questionID) return score;
      return { ...score, marks_received: e.target.value };
    });
    const updatedData = {
      ...dataToSubmit,
      scores: updatedScoreArray,
    };
    setDataToSubmit((prev) => updatedData);
  };

  const addData = (e) => {
    const updatedData = {
      ...dataToSubmit,
      [e.target.name]: e.target.value,
    };
    setDataToSubmit((prev) => updatedData);
  };

  const handleSubmit = () => {
    try {
      async function submitData() {
        const serverResponse = await saveData(
          `${process.env.REACT_APP_API_URL}/api/score`,
          dataToSubmit
        );
        if (serverResponse.message === "OK") {
          console.log(serverResponse.results.data);
          navigate(-1, { replace: true });
        } else {
          throw Error(serverResponse.message);
        }
      }
      submitData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="scoreForm">
      <h3>Syllabus Information</h3>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">Syllabus</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="syllabus"
              name="syllabus"
              value={syllabusID}
              onChange={({ target }) => setSyllabusID(target.value)}
            >
              {syllabusDropdown.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.syllabusName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">Test</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="test"
              name="test"
              value={testID}
              onChange={({ target }) => setTestID(target.value)}
            >
              {testDropdown
                .filter((item) => item.syllabusID === syllabusID)
                .map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.testName}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="date"
            label="Test Date"
            type="date"
            name="testDate"
            value={dataToSubmit.testDate}
            onChange={addData}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {questions.length !== 0 && (
          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableCell sx={{ fontWeight: "bold" }}>Q</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Topic Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Difficulty</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
              </TableHead>
              <TableBody>
                {questions.map((question, index) => {
                  return (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{question.topicName}</TableCell>
                      <TableCell>{question.difficulty}</TableCell>
                      <TableCell>
                        <input
                          className="scoreInput"
                          type="number"
                          onChange={(e) => updateScore(e, question.questionID)}
                        ></input>{" "}
                        {" / " + question.marks}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        )}
      </Grid>
      {questions.length !== 0 && (
        <div className="formEnd">
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            color="warning"
            className="cancelBtn"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="submitBtn"
          >
            Add Scores
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScoreForm;
