import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../testForm/testForm.css";
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

const SyllabusForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { syllabusID } = useParams();
  const topicInfo = location.state ? location.state.syllabus.topicInfo : null;
  const syllabusName = location.state
    ? location.state.syllabus.syllabusName
    : null;
  const [editMode, setEditMode] = useState(false);
  const [topic, setTopic] = useState("");
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [editTopic, setEditTopic] = useState("");
  const [dataToSubmit, setDataToSubmit] = useState({
    syllabusName: "",
    topics: [],
  });
  useEffect(() => {
    if (topicInfo) {
      let updatedData = {
        syllabusName: syllabusName,
        topics: [...topicInfo],
      };
      setDataToSubmit({ ...updatedData });
      setEditMode(true);
    }
  }, [topicInfo]);

  const addData = (e) => {
    const updatedData = {
      ...dataToSubmit,
      [e.target.name]: e.target.value,
    };
    setDataToSubmit((prev) => updatedData);
  };

  const addTopic = (e) => {
    if (topic === "") return;
    const newTopicsArray = [...dataToSubmit.topics, { topicName: topic }];
    const updatedData = {
      ...dataToSubmit,
      topics: newTopicsArray,
    };
    setTopic("");
    setDataToSubmit((prev) => updatedData);
    if (editMode) {
      try {
        async function submitQuestion() {
          const serverResponse = await saveData(
            `${process.env.REACT_APP_API_URL}/api/topic`,
            {
              topicName: topic,
              syllabusID: syllabusID,
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

  const removeTopic = (topic) => {
    const newTopicArray = dataToSubmit.topics.filter((item) => item !== topic);
    const updatedData = {
      ...dataToSubmit,
      topics: newTopicArray,
    };
    setDataToSubmit((prev) => updatedData);
    if (editMode) {
      handleDelete(topic.topicID);
    }
  };

  async function handleDelete(topicID) {
    await deleteData(
      `${process.env.REACT_APP_API_URL}/api/topic/${topicID}`,
      dataToSubmit
    );
  }

  const handleSubmit = () => {
    try {
      async function submitData() {
        if (
          dataToSubmit.syllabusName === "" ||
          dataToSubmit.topics.length === 0
        )
          return;
        const serverResponse = await saveData(
          `${process.env.REACT_APP_API_URL}/api/syllabus`,
          dataToSubmit
        );
        if (serverResponse.message === "OK") {
          const { newSyllabusID } = serverResponse.results.data;
          navigate(`/syllabus/${newSyllabusID}/topics`, {
            replace: true,
            state: { syllabusName: dataToSubmit.syllabusName },
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

  const editRow = (topic) => {
    try {
      async function editData() {
        if (editTopic === "") return;
        const serverResponse = await updateData(
          `${process.env.REACT_APP_API_URL}/api/topic/${topic.topicID}`,
          {
            topicName: editTopic,
          }
        );
        if (serverResponse.message === "OK") {
          setCurrentlyEditing(false);
          const updatedTopicsArray = dataToSubmit.topics.map((item) => {
            if (item.topicID !== topic.topicID) {
              return item;
            } else {
              return {
                ...topic,
                topicName: editTopic,
                edit: false,
              };
            }
          });
          const updatedData = {
            ...dataToSubmit,
            topics: updatedTopicsArray,
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

  const editTopicMode = (topic) => {
    setCurrentlyEditing(true);
    setEditTopic(topic.topicName);
    const updatedTopicsArray = dataToSubmit.topics.map((item) => {
      if (item !== topic) {
        return item;
      } else {
        return { ...topic, edit: true };
      }
    });
    const updatedData = {
      ...dataToSubmit,
      topics: updatedTopicsArray,
    };
    setDataToSubmit((prev) => updatedData);
  };

  const cancelEdit = (topic) => {
    const updatedTopicsArray = dataToSubmit.topics.map((item) => {
      if (item !== topic) {
        return item;
      } else {
        return { ...topic, edit: false };
      }
    });
    const updatedData = {
      ...dataToSubmit,
      topics: updatedTopicsArray,
    };
    setDataToSubmit((prev) => updatedData);
    setCurrentlyEditing(false);
  };

  return (
    <div className="testForm">
      <h3>Syllabus Information</h3>

      <Grid container spacing={8}>
        <Grid item xs={12} sm={8} md={5}>
          <TextField
            required
            id="syllabusName"
            name="syllabusName"
            label="Syllabus Name"
            fullWidth
            variant="standard"
            value={dataToSubmit.syllabusName}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableCell sx={{ fontWeight: "bold" }}>T</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Topic Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}></TableCell>
            </TableHead>
            <TableBody>
              {dataToSubmit.topics.map((topic, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    {topic.edit ? (
                      <>
                        <TableCell>
                          <TextField
                            required
                            size="small"
                            id="topic"
                            name="topic"
                            fullWidth
                            variant="standard"
                            value={editTopic}
                            onChange={(e) => setEditTopic(e.target.value)}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{topic.topicName}</TableCell>
                      </>
                    )}
                    {topic.edit ? (
                      <TableCell align="right">
                        <IconButton
                          onClick={() => cancelEdit(topic)}
                          aria-label="cancel-edit"
                          color="error"
                        >
                          <CloseIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => editRow(topic)}
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
                              !currentlyEditing && editTopicMode(topic)
                            }
                            aria-label="edit"
                            color="secondary"
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        <IconButton
                          onClick={() => removeTopic(topic)}
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
                  <TextField
                    required
                    size="small"
                    id="topic"
                    name="topic"
                    fullWidth
                    variant="standard"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={addTopic} variant="contained">
                    +
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <div className="formEnd">
        {topicInfo ? (
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
              Add Syllabus
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SyllabusForm;
