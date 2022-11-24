import "./testPage.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getData, deleteData } from "../../helpers/apiFunctions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const TestPage = () => {
  const [tests, setTests] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();
  const { syllabusID } = useParams();
  const location = useLocation();
  const syllabusName = location.state ? location.state.syllabusName : null;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [deleteText, setDeleteText] = useState("");

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/syllabus/${syllabusID}/tests`
        );
        if (serverResponse.message === "OK") {
          setTests(serverResponse.results.data);
          setRefresh(false);
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
  }, [refresh]);

  const handleDelete = (e) => {
    setDeleteID(e.target.name);
    handleOpen();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDeleteID(null);
    setDeleteText("");
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteText !== "delete") {
      console.log("Will not delete");
      return;
    }
    async function removeData() {
      await deleteData(`${process.env.REACT_APP_API_URL}/api/test/${deleteID}`);
      setRefresh(true);
      handleClose();
    }
    removeData();
  };

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
                        style={{ marginRight: "20px" }}
                        onClick={() =>
                          navigate(`${test.testID}`, {
                            state: { testName: test.testName, syllabusName },
                          })
                        }
                        variant="outlined"
                        className="viewBtn"
                      >
                        View
                      </Button>
                      <Button
                        className="deleteBtn"
                        name={test.testID}
                        onClick={handleDelete}
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                </Table>
              );
            })}
          </div>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="deleteModal">
            <h3 className="title">To confirm delete, type 'delete' below:</h3>
            <TextField
              id="standard-basic"
              variant="standard"
              sx={{ mb: 2, mt: 2 }}
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={handleConfirmDelete}
            >
              CONFIRM
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TestPage;
