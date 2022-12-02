import React, { useRef } from "react";
import "./scoreHistoryTable.css";
import { useState, useEffect } from "react";
import { getData } from "../../helpers/apiFunctions";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { status } from "../../helpers/status";
import { useReactToPrint } from "react-to-print";
import Button from "@mui/material/Button";

const ScoreHistoryTable = ({ studentID }) => {
  const baordColumnRef = useRef();
  const baordRowRef = useRef();
  const baordCellRef = useRef();
  const [syllabusDropdown, setSyllabusDropdown] = useState([]);
  const [syllabusID, setSyllabusID] = useState("");
  const [rowTopics, setRowTopics] = useState([]);
  const [columnTests, setColumnTests] = useState([]);
  const [scores, setScores] = useState([]);
  const componentPrintRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentPrintRef.current,
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
        const serverTopicsResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/syllabus/${syllabusID}/topics`
        );
        if (serverTopicsResponse.message === "OK") {
          setRowTopics([...serverTopicsResponse.results.data]);
        } else {
          throw Error(serverTopicsResponse.message);
        }
        const serverTestsResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/test/completedForSyllabus/${syllabusID}/${studentID}`
        );
        if (serverTestsResponse.message === "OK") {
          setColumnTests([...serverTestsResponse.results.data]);
        } else {
          throw Error(serverTestsResponse.message);
        }
        const serverScoresResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/score/syllabus/${syllabusID}/${studentID}`
        );
        if (serverScoresResponse.message === "OK") {
          setScores([...serverScoresResponse.results.data]);
        } else {
          throw Error(serverScoresResponse.message);
        }
      }
      if (syllabusID !== "") fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [syllabusID, studentID]);

  useEffect(() => {
    if (scores.length === 0) return;
    updateScoreHistory();
  }, [scores]);

  function updateScoreHistory() {
    scores.map((score) => {
      const div = document.getElementById(`${score.topicID} - ${score.testID}`);
      div.innerText = score.marksReceived;
      div.classList.add(status(score.marksReceived, score.marks));
    });
  }

  return (
    <>
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
      <div
        className="buttonContainer"
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="outlined" onClick={handlePrint}>
          Print
        </Button>
      </div>
      {scores.length !== 0 ? (
        <div className="scoreHistory" ref={componentPrintRef}>
          <div id="boardColumns" ref={baordColumnRef}>
            {columnTests.map((test) => {
              return <div className="column">{test.testName}</div>;
            })}
          </div>
          <div id="boardContainer">
            <div id="boardRows" ref={baordRowRef}>
              {rowTopics.map((topic) => {
                return <div className="row">{topic.topicName}</div>;
              })}
            </div>
            <div id="boardCells" ref={baordCellRef}>
              {rowTopics.map((topic) => {
                return (
                  <div className="row">
                    {columnTests.map((test) => {
                      return (
                        <div
                          id={`${topic.topicID} - ${test.id}`}
                          className="column"
                        >
                          -
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ScoreHistoryTable;
