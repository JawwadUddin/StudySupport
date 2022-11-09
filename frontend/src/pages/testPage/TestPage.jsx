import "./testPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const TestPage = () => {
  const [syllabuses, setSyllabuses] = useState([]);
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponseSyllabus = await getData(
          `${process.env.REACT_APP_API_URL}/api/syllabus`
        );
        const serverResponseTest = await getData(
          `${process.env.REACT_APP_API_URL}/api/test`
        );
        if (serverResponseSyllabus.message === "OK") {
          setSyllabuses(serverResponseSyllabus.results.data);
        } else {
          throw Error(serverResponseSyllabus.message);
        }
        if (serverResponseTest.message === "OK") {
          setTests(serverResponseTest.results.data);
        } else {
          throw Error(serverResponseTest.message);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="testPageContainer">
      <h2 className="title">Tests</h2>
      <Grid container>
        {syllabuses.map((syllabus) => {
          return (
            <Grid item md={12} lg={6}>
              <div className="listContainer">
                <div className="syllabusHeader">
                  <div className="syllabusTitle">{syllabus.syllabusName}</div>
                  <Button
                    onClick={() =>
                      navigate(`/tests/new`, {
                        state: { syllabus: syllabus },
                      })
                    }
                    variant="contained"
                    className="createBtn"
                  >
                    Create New Test
                  </Button>
                </div>
                {tests
                  .filter((test) => test.syllabusID === syllabus.id)
                  .map((test) => {
                    return (
                      <Table>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {test.testName}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() =>
                                navigate(`/tests/${test.id}`, {
                                  state: { testName: test.testName },
                                })
                              }
                              variant="outlined"
                              className="createBtn"
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      </Table>
                    );
                  })}
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default TestPage;
