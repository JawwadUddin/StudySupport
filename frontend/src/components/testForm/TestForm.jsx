import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getData,
  saveData,
  updateData,
  deleteData,
} from "../../helpers/apiFunctions";
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
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const TestForm = ({ syllabusID }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const testInfo = location.state ? location.state.syllabus.testInfo : null;
  const testName = location.state ? location.state.syllabus.testName : null;
  const mock = location.state ? location.state.syllabus.mock : null;
  const { testID } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [editSelectedTopic, setEditSelectedTopic] = useState(null);
  const [editDifficulty, setEditDifficulty] = useState("");
  const [editMarks, setEditMarks] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [marks, setMarks] = useState("");
  const [dataToSubmit, setDataToSubmit] = useState({
    testName: "",
    type: "",
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

  useEffect(() => {
    if (testInfo) {
      let updatedData = {
        testName: testName,
        type: mock ? 1 : 0,
        syllabusID: syllabusID,
        questions: [...testInfo],
      };
      setDataToSubmit({ ...updatedData });
      setEditMode(true);
    }
  }, [testInfo]);

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
      topicID: selectedTopic.topicID,
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
    if (editMode) {
      try {
        async function submitQuestion() {
          const serverResponse = await saveData(
            `${process.env.REACT_APP_API_URL}/api/question`,
            {
              testID: testID,
              topicID: selectedTopic.topicID,
              difficulty: difficulty,
              marks: marks,
            }
          );
          if (serverResponse.message === "OK") {
            return;
          } else {
            throw Error(serverResponse.message);
          }
        }
        submitQuestion();
      } catch (error) {
        console.log(error);
      }
    }
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
    if (editMode) {
      handleDelete(question.questionID);
    }
  };

  async function handleDelete(questionID) {
    await deleteData(
      `${process.env.REACT_APP_API_URL}/api/question/${questionID}`,
      dataToSubmit
    );
  }

  const handleSubmit = () => {
    try {
      async function submitData() {
        if (
          dataToSubmit.testName === "" ||
          dataToSubmit.type === "" ||
          dataToSubmit.questions.length === 0
        )
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

  const editQuestion = (question) => {
    try {
      async function editData() {
        if (
          editSelectedTopic === null ||
          editDifficulty === "" ||
          editMarks === ""
        )
          return;
        const serverResponse = await updateData(
          `${process.env.REACT_APP_API_URL}/api/question/${question.questionID}`,
          {
            topicID: editSelectedTopic.topicID,
            difficulty: editDifficulty,
            marks: editMarks,
          }
        );
        if (serverResponse.message === "OK") {
          setCurrentlyEditing(false);
          const updatedQuestionArray = dataToSubmit.questions.map((item) => {
            if (item.questionID !== question.questionID) {
              return item;
            } else {
              return {
                ...question,
                topicID: editSelectedTopic.topicID,
                topicName: editSelectedTopic.topicName,
                difficulty: editDifficulty,
                marks: editMarks,
                edit: false,
              };
            }
          });
          const updatedData = {
            ...dataToSubmit,
            questions: updatedQuestionArray,
          };
          setDataToSubmit((prev) => updatedData);
        } else {
          throw Error(serverResponse.message);
        }
      }
      editData();
    } catch (error) {
      console.log(error);
    }
  };

  const editQuestionMode = (question) => {
    setCurrentlyEditing(true);
    setEditSelectedTopic({
      topicID: question.topicID,
      topicName: question.topicName,
    });
    setEditDifficulty(question.difficulty);
    setEditMarks(question.marks);
    const updatedQuestionArray = dataToSubmit.questions.map((item) => {
      if (item.questionID !== question.questionID) {
        return item;
      } else {
        return { ...question, edit: true };
      }
    });
    const updatedData = {
      ...dataToSubmit,
      questions: updatedQuestionArray,
    };
    setDataToSubmit((prev) => updatedData);
  };

  const cancelEdit = (question) => {
    const updatedQuestionArray = dataToSubmit.questions.map((item) => {
      if (item.questionID !== question.questionID) {
        return item;
      } else {
        return { ...question, edit: false };
      }
    });
    const updatedData = {
      ...dataToSubmit,
      questions: updatedQuestionArray,
    };
    setDataToSubmit((prev) => updatedData);
    setCurrentlyEditing(false);
  };

  return (
    <div className="testForm form">
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
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select name="type" value={dataToSubmit.type} onChange={addData}>
              <MenuItem value={0}>Exam</MenuItem>
              <MenuItem value={1}>Mock</MenuItem>
            </Select>
          </FormControl>
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
                    {question.edit ? (
                      <>
                        <TableCell>
                          <Autocomplete
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={topics}
                            value={editSelectedTopic}
                            onChange={(e, value) => setEditSelectedTopic(value)}
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
                            value={editDifficulty}
                            onChange={(e) => setEditDifficulty(e.target.value)}
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
                            value={editMarks}
                            onChange={(e) => setEditMarks(e.target.value)}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{question.topicName}</TableCell>
                        <TableCell>{question.difficulty}</TableCell>
                        <TableCell>{question.marks}</TableCell>
                      </>
                    )}
                    {question.edit ? (
                      <TableCell align="right">
                        <IconButton
                          onClick={() => cancelEdit(question)}
                          aria-label="cancel-edit"
                          color="error"
                        >
                          <CloseIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => editQuestion(question)}
                          aria-label="confirm-edit"
                          color="success"
                        >
                          <CheckIcon />
                        </IconButton>
                      </TableCell>
                    ) : (
                      <TableCell align="right">
                        {editMode && (
                          <IconButton
                            onClick={() =>
                              !currentlyEditing && editQuestionMode(question)
                            }
                            aria-label="edit"
                            color="secondary"
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        <IconButton
                          onClick={() => removeQuestion(question)}
                          aria-label="delete"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
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
        {testInfo ? (
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            color="warning"
            className="editBtn"
          >
            Return
          </Button>
        ) : (
          <>
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
              Add Test
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestForm;
