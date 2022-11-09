import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./studentPage.css";
import Table from "../../components/table/Table";
import { getData, deleteData } from "../../helpers/apiFunctions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [deleteText, setDeleteText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/student`
        );
        if (serverResponse.message === "OK") {
          setStudents(serverResponse.results.data);
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
      await deleteData(
        `${process.env.REACT_APP_API_URL}/api/student/${deleteID}`
      );
      setRefresh(true);
      handleClose();
    }
    removeData();
  };

  return (
    <div className="studentPageContainer">
      <h2 className="title">Students</h2>
      <div className="listContainer">
        <div className="listHeader">
          <div className="listTitle">All Students</div>
          <Button
            onClick={() => navigate("/students/new")}
            variant="contained"
            className="createBtn"
          >
            Create New Student
          </Button>
        </div>
        <Table
          data={students}
          type="student"
          setDeleteID={setDeleteID}
          openModal={handleOpen}
        />
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
                className="text"
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
    </div>
  );
};

export default StudentPage;
