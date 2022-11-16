import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./testForm.css";
import { getData, saveData } from "../../helpers/apiFunctions";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const TestForm = ({ syllabusID }) => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [marks, setMarks] = useState("");
  const [dataToSubmit, setDataToSubmit] = useState({
    testName: "",
    syllabusID: syllabusID,
    questions: [],
  });

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/syllabus/${syllabusID}/topics`
        );
        if (serverResponse.message === "OK") {
          setTopics(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [syllabusID]);

  const addData = (e) => {
    const updatedData = {
      ...dataToSubmit,
      [e.target.name]: e.target.value,
    };
    setDataToSubmit((prev) => updatedData);
  };

  const addQuestion = (e) => {
    if (selectedTopic === null || difficulty === "" || marks === "") return;
    const newQuestion = {
      topic_id: selectedTopic.topicID,
      topicName: selectedTopic.topicName,
      difficulty: difficulty,
      marks: marks,
    };
    const newQuestionArray = [...dataToSubmit.questions, newQuestion];
    const updatedData = {
      ...dataToSubmit,
      questions: newQuestionArray,
    };
    setSelectedTopic(null);
    setDifficulty("");
    setMarks("");
    setDataToSubmit((prev) => updatedData);
  };

  const removeQuestion = (question) => {
    const newQuestionArray = dataToSubmit.questions.filter(
      (item) => item !== question
    );
    const updatedData = {
      ...dataToSubmit,
      questions: newQuestionArray,
    };
    setDataToSubmit((prev) => updatedData);
  };

  const handleSubmit = () => {
    try {
      async function submitData() {
        if (dataToSubmit.testName === "" || dataToSubmit.questions.length === 0)
          return;
        const serverResponse = await saveData(
          `${process.env.REACT_APP_API_URL}/api/test`,
          dataToSubmit
        );
        if (serverResponse.message === "OK") {
          const { newTestID } = serverResponse.results.data;
          navigate(`/syllabus/${syllabusID}/tests/${newTestID}`, {
            replace: true,
            state: { testName: dataToSubmit.testName },
          });
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
    <div className="testForm">
      <h3>Test Information</h3>

      <Grid container spacing={8}>
        <Grid item xs={12} sm={8} md={5}>
          <TextField
            required
            id="testName"
            name="testName"
            label="Test Name"
            fullWidth
            variant="standard"
            value={dataToSubmit.testName}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableCell sx={{ fontWeight: "bold" }}>Q</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Topic Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Difficulty</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Marks</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}></TableCell>
            </TableHead>
            <TableBody>
              {dataToSubmit.questions.map((question, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{question.topicName}</TableCell>
                    <TableCell>{question.difficulty}</TableCell>
                    <TableCell>{question.marks}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => removeQuestion(question)}
                        aria-label="delete"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={topics}
                    value={selectedTopic}
                    onChange={(e, value) => setSelectedTopic(value)}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.topicName}
                    renderInput={(params) => (
                      <TextField {...params} label="Topic" />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    required
                    size="small"
                    id="difficulty"
                    name="difficulty"
                    inputProps={{ type: "number", min: "0" }}
                    fullWidth
                    variant="standard"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    required
                    size="small"
                    id="marks"
                    name="marks"
                    fullWidth
                    variant="standard"
                    inputProps={{ type: "number", min: "0" }}
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={addQuestion} variant="contained">
                    +
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <div className="formEnd">
        <Button
          onClick={handleSubmit}
          variant="contained"
          className="submitBtn"
        >
          Add Test
        </Button>
      </div>
    </div>
  );
};

export default TestForm;
