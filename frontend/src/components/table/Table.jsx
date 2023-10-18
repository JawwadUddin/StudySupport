import "./table.css";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";

const Table = ({ data, type, setDeleteID, openModal }) => {
  const navigate = useNavigate();

  let columns = [];
  switch (type) {
    case "contact":
      columns = [
        { field: "id", headerName: "ID", width: "10" },
        { field: "fullName", headerName: "Full name", width: 200, valueGetter: (params) => {
          return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
        }, 
        },
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
        { field: "id", headerName: "ID", width: 100 },
        { field: "fullName", headerName: "Full name", width: 200, valueGetter: (params) => {
          return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
        }, 
        },
        {
          field: "schoolYear",
          headerName: "Year",
          type: "number",
          width: 100,
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
      break;
    case "invoice":
      columns = [
        { field: "invoiceDate", headerName: "Date", width: 200 },
        { field: "id", headerName: "NO.", width: 100 },
        { field: "fullName", headerName: "Full name", width: 200 },
        {
          field: "amountDue",
          headerName: "Amount",
          type: "number",
          width: 100,
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
              </>
            );
          },
        },
      ];
      break;
    case "payment":
      columns = [
        { field: "paymentDate", headerName: "Date", width: 200 },
        { field: "id", headerName: "NO.", width: 100 },
        { field: "fullName", headerName: "Full name", width: 200 },
        {
          field: "amountPaid",
          headerName: "Amount",
          type: "number",
          width: 100,
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
                  name={params.row.familyID + "/" + params.row.paymentDate}
                  onClick={handleView}
                  variant="outlined"
                  style={{ marginRight: "20px" }}
                >
                  View
                </Button>
              </>
            );
          },
        },
      ];
      break;
    default:
      console.log("Type given does not match a case");
  }

  const handleView = (e) => {
    if (type === "contact") {
      navigate(`/contacts/${e.target.name}`);
    }
    if (type === "student") {
      navigate(`/students/${e.target.name}`);
    }
    if (type === "invoice") {
      navigate(`/invoices/${e.target.name}`);
    }
    if (type === "payment") {
      navigate(`/payments/${e.target.name}`);
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
        getRowId={(row) => row.id || uuidv4()}
        autoHeight
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "#962626",
          "& .MuiDataGrid-cell": {
            borderColor: "#962626",
            color: "black",
            fontWeight: "600",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderColor: "#962626",
          },
        }}
      />
    </>
  );
};

export default Table;
