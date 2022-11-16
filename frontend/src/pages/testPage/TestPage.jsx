import "./testPage.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

const TestPage = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const { syllabusID } = useParams();
  const location = useLocation();
  const syllabusName = location.state ? location.state.syllabusName : null;
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/syllabus/${syllabusID}/tests`
        );
        if (serverResponse.message === "OK") {
          setTests(serverResponse.results.data);
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
    <div className="testPageContainer">
      <h2 className="title">Tests</h2>
      <Grid container>
        <Grid item xs={12}>
          <div className="listContainer">
            <div className="syllabusHeader">
              <div className="syllabusTitle">{syllabusName}</div>
              <Button
                onClick={() =>
                  navigate(`new`, {
                    state: {
                      syllabus: {
                        syllabusID,
                        syllabusName,
                      },
                    },
                  })
                }
                variant="contained"
                className="createBtn"
              >
                Create New Test
              </Button>
            </div>
            <div className="search">
              <TextField
                className="text"
                id="standard-basic"
                size="small"
                variant="outlined"
                label="Query"
                value={query}
                onChange={({ target: { value } }) =>
                  setQuery(value.toLowerCase())
                }
              />
            </div>
            {(query
              ? tests.filter((test) =>
                  test.testName.toLowerCase().includes(query)
                )
              : tests
            ).map((test, index) => {
              return (
                <Table key={index}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {test.testName}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate(`${test.testID}`, {
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
      </Grid>
    </div>
  );
};

export default TestPage;
