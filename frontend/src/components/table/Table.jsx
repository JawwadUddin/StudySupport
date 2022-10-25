import "./table.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { deleteData } from "../../helpers/apiFunctions";

const Table = ({ data, type }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [deleteText, setDeleteText] = useState("");
  const [deleteID, setDeleteID] = useState(null);

  let columns = [];
  switch (type) {
    case "contact":
      columns = [
        { field: "id", headerName: "ID", width: "10" },
        { field: "fullName", headerName: "Full name", width: 200 },
        {
          field: "address",
          headerName: "Address",
          width: 300,
          valueGetter: (params) =>
            `${params.row.address || ""} , ${params.row.postCode || ""}`,
        },
        {
          field: "mobile",
          headerName: "Contact Number",
          type: "number",
          width: 200,
        },
        {
          field: "balance",
          headerName: "Balance",
          type: "number",
          width: 200,
        },
        {
          field: "view-delete",
          headerName: "",
          width: 300,
          sortable: false,
          type: "number",
          renderCell: (params) => {
            return (
              <>
                <Button
                  className="viewBtn"
                  name={params.row.id}
                  onClick={handleView}
                  variant="outlined"
                  style={{ marginRight: "20px" }}
                >
                  View
                </Button>
                <Button
                  className="deleteBtn"
                  name={params.row.id}
                  onClick={handleDelete}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
              </>
            );
          },
        },
      ];
      break;
    case "student":
      columns = [
        { field: "id", headerName: "ID", width: "10" },
        { field: "fullName", headerName: "Full name", width: 200 },
        {
          field: "schoolYear",
          headerName: "Year",
          type: "number",
          width: 200,
        },
        {
          field: "DOB",
          headerName: "DOB",
          type: "number",
          width: 200,
        },
        {
          field: "view-delete",
          headerName: "",
          width: 300,
          sortable: false,
          type: "number",
          renderCell: (params) => {
            return (
              <>
                <Button
                  className="viewBtn"
                  name={params.row.id}
                  onClick={handleView}
                  variant="outlined"
                  style={{ marginRight: "20px" }}
                >
                  View
                </Button>
                <Button
                  className="deleteBtn"
                  name={params.row.id}
                  onClick={handleDelete}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
              </>
            );
          },
        },
      ];
  }

  const handleView = (e) => {
    if (type === "contact") {
      navigate(`/contacts/${e.target.name}`);
    }
    if (type === "student") {
      navigate(`/students/${e.target.name}`);
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDeleteID(null);
    setOpen(false);
  };
  const handleDelete = (e) => {
    console.log(e.target.name, "delete");
    setDeleteID(e.target.name);
    handleOpen();
  };
  const handleConfirmDelete = () => {
    if (deleteText === "delete") {
      if (type === "student") {
        async function removeData() {
          const serverResponse = await deleteData(
            `${process.env.REACT_APP_API_URL}/api/student/${deleteID}`
          );
          handleClose();
        }
        removeData();
      }
      if (type === "contact") {
        async function removeData() {
          const serverResponse = await deleteData(
            `${process.env.REACT_APP_API_URL}/api/family/${deleteID}`
          );
          handleClose();
        }
        removeData();
      }
    } else {
      console.log("will not delete");
    }
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

  return (
    <>
      <DataGrid
        rows={data}
        columns={columns}
        // pageSize={3}
        // rowsPerPageOptions={[3]}
        checkboxSelection
        autoHeight
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
    </>
  );
};

export default Table;
