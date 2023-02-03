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
  const [filteredRowTopics, setFilteredRowTopics] = useState([]);

  const [columnTests, setColumnTests] = useState([]);
  const [columnOption, setColumnOption] = useState("all");
  const [filteredColumnTests, setFilteredColumnTests] = useState([]);

  const [scores, setScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);

  const [reload, setReload] = useState(false);

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
        // const serverTopicsResponse = await getData(
        //   `${process.env.REACT_APP_API_URL}/api/syllabus/${syllabusID}/topics`
        // );
        const serverTopicsResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/topic/${syllabusID}/${studentID}`
        );
        if (serverTopicsResponse.message === "OK") {
          setRowTopics([...serverTopicsResponse.results.data]);
          setFilteredRowTopics([...serverTopicsResponse.results.data]);
        } else {
          throw Error(serverTopicsResponse.message);
        }
        const serverTestsResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/test/completedForSyllabus/${syllabusID}/${studentID}`
        );
        if (serverTestsResponse.message === "OK") {
          setColumnTests([...serverTestsResponse.results.data]);
          setFilteredColumnTests([...serverTestsResponse.results.data]);
        } else {
          throw Error(serverTestsResponse.message);
        }
        const serverScoresResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/score/syllabus/${syllabusID}/${studentID}`
        );
        if (serverScoresResponse.message === "OK") {
          setScores([...serverScoresResponse.results.data]);
          setFilteredScores([...serverScoresResponse.results.data]);
        } else {
          throw Error(serverScoresResponse.message);
        }
        console.log({ rowTopics, columnTests, scores });
      }
      if (syllabusID !== "") fetchData();
      setColumnOption("all");
    } catch (error) {
      console.log(error);
    }
  }, [syllabusID, studentID]);

  useEffect(() => {
    if (scores.length === 0) return;
    setTimeout(() => {
      updateScoreHistory();
    }, 500);
  }, [scores]);

  function updateScoreHistory() {
    filteredScores.map((score) => {
      const div = document.getElementById(`${score.topicID} - ${score.testID}`);
      div.innerText = score.marksReceived;
      div.classList.add(status(score.marksReceived, score.marks));
    });
  }

  function clearScores() {
    scores.map((score) => {
      const div = document.getElementById(`${score.topicID} - ${score.testID}`);
      if (div !== null) {
        div.innerText = "-";
        div.classList.remove("fail", "average", "good", "excellent");
      }
    });
  }

  function filterColumn(option) {
    setReload(true);
    clearScores();

    if (option === "all") {
      setFilteredColumnTests([...columnTests]);
    }
    if (option === "exam") {
      setFilteredColumnTests([
        ...columnTests.filter((item) => item.mock === false),
      ]);
    }
    if (option === "mock") {
      setFilteredColumnTests([
        ...columnTests.filter((item) => item.mock === true),
      ]);
    }
  }

  useEffect(() => {
    if (reload) {
      let filteredColumnTestIDs = [
        ...filteredColumnTests.map((item) => item.id),
      ];
      setFilteredScores([
        ...scores.filter((item) => filteredColumnTestIDs.includes(item.testID)),
      ]);
      setReload(false);
    }
  }, [filteredColumnTests, reload]);

  useEffect(() => {
    function filterTopics() {
      let scoreTopicsIDs = [...filteredScores.map((score) => score.topicID)];
      setFilteredRowTopics([
        ...rowTopics.filter((item) => scoreTopicsIDs.includes(item.topicID)),
      ]);
    }
    filterTopics();

    setTimeout(() => {
      updateScoreHistory();
    }, 500);
  }, [filteredScores]);

  function handleOptionChange(value) {
    setColumnOption(value);
    filterColumn(value);
  }

  return (
    <>
      <FormControl sx={{ minWidth: 300, marginRight: 2 }}>
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
      {scores.length !== 0 ? (
        <>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Tests</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="tests"
              name="tests"
              value={columnOption}
              onChange={({ target }) => handleOptionChange(target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="exam">Exam</MenuItem>
              <MenuItem value="mock">Mock</MenuItem>
            </Select>
          </FormControl>
        </>
      ) : null}
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
      {scores.length !== 0 && filteredRowTopics.length !== 0 ? (
        <div className="scoreHistory" ref={componentPrintRef}>
          <div id="boardColumns" ref={baordColumnRef}>
            {filteredColumnTests.map((test) => {
              return <div className="column">{test.testName}</div>;
            })}
          </div>
          <div id="boardContainer">
            <div id="boardRows" ref={baordRowRef}>
              {filteredRowTopics.map((topic) => {
                return <div className="row">{topic.topicName}</div>;
              })}
            </div>
            <div id="boardCells" ref={baordCellRef}>
              {filteredRowTopics.map((topic) => {
                return (
                  <div className="row">
                    {filteredColumnTests.map((test) => {
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
