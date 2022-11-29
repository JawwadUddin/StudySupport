import "./topicPage.css";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
const TopicPage = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const { syllabusID } = useParams();
  const location = useLocation();
  const syllabusName = location.state ? location.state.syllabusName : null;

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
  }, []);

  return (
    <div className="topicPageContainer">
      <h2 className="title">{syllabusName}</h2>
      <div className="listContainer">
        <div className="listHeader">
          <div className="listTitle">Topic Information</div>
          <Button
            onClick={() =>
              navigate(`edit`, {
                state: {
                  syllabus: {
                    syllabusName,
                    topicInfo: topics,
                  },
                },
              })
            }
            variant="outlined"
            color="secondary"
            className="editBtn"
          >
            Edit Topics
          </Button>
        </div>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableCell sx={{ fontWeight: "bold" }}>T</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Topic Name</TableCell>
            </TableHead>
            <TableBody>
              {topics.map((topic, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{topic.topicName}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TopicPage;
