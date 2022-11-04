import "./table.css";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const Table = ({ data, type, setDeleteID, openModal }) => {
  const navigate = useNavigate();

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

  const handleDelete = (e) => {
    setDeleteID(e.target.name);
    openModal();
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
    </>
  );
};

export default Table;
