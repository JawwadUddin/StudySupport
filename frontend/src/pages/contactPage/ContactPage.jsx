import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./contactPage.css";
import { getData, deleteData } from "../../helpers/apiFunctions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  // Delete state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [deleteText, setDeleteText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/family`,
        );
        if (serverResponse.message === "OK") {
          setContacts(serverResponse.results.data);
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

  const handleSortClick = (column) => {
    let newDirection;
    if (sortColumn === column && sortDirection === "asc") {
      newDirection = "desc";
    } else if (sortColumn === column && sortDirection === "desc") {
      newDirection = "none";
    } else {
      newDirection = "asc";
    }
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortDirection === "asc"
        ? "\u25B2"
        : sortDirection === "desc"
          ? "\u25BC"
          : "\u2022";
    }
    return "\u2022";
  };

  const filteredAndSorted = useMemo(() => {
    let data = [...contacts];

    if (query) {
      data = data.filter((c) =>
        (c.firstName + c.lastName + c.address + c.mobile)
          .toString()
          .toLowerCase()
          .includes(query),
      );
    }

    if (sortColumn && sortDirection !== "none") {
      data.sort((a, b) => {
        let valA, valB;
        switch (sortColumn) {
          case "name":
            valA = (a.firstName + " " + a.lastName).toLowerCase();
            valB = (b.firstName + " " + b.lastName).toLowerCase();
            return sortDirection === "asc"
              ? valA.localeCompare(valB)
              : valB.localeCompare(valA);
          default:
            return 0;
        }
      });
    }

    return data;
  }, [contacts, query, sortColumn, sortDirection]);

  const handleOpenDelete = (e, id) => {
    e.stopPropagation();
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteID(null);
    setDeleteText("");
    setDeleteOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteText !== "delete") return;
    async function removeData() {
      await deleteData(
        `${process.env.REACT_APP_API_URL}/api/family/${deleteID}`,
      );
      setRefresh(true);
      handleCloseDelete();
    }
    removeData();
  };

  return (
    <div className="contactPageContainer">
      <div className="pageHeader">
        <div className="headerLeft">
          <h2>Contacts</h2>
          <div className="subtitle">Manage all family contacts</div>
        </div>
        <Button
          variant="contained"
          onClick={() => navigate("/contacts/new")}
          sx={{
            textTransform: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            borderRadius: "8px",
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          }}
        >
          + New Contact
        </Button>
      </div>

      <div className="controlsBar">
        <div className="searchField">
          <TextField
            size="small"
            variant="outlined"
            label="Search"
            value={query}
            onChange={({ target: { value } }) => setQuery(value.toLowerCase())}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                fontFamily: "'DM Sans', sans-serif",
              },
            }}
          />
        </div>
      </div>

      <div className="tableWrapper">
        <div className="tableScroll">
          <table>
            <thead>
              <tr>
                <th
                  className={`sortable ${sortColumn === "name" ? "sortActive" : ""}`}
                  onClick={() => handleSortClick("name")}
                >
                  Name{" "}
                  <span className="sortIcon">{getSortIcon("name")}</span>
                </th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th className="actionsHeader">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.length > 0 ? (
                filteredAndSorted.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => navigate(`/contacts/${contact.id}`)}
                  >
                    <td className="nameCell">
                      {contact.firstName} {contact.lastName}
                    </td>
                    <td>
                      {contact.address}
                      {contact.postCode ? `, ${contact.postCode}` : ""}
                    </td>
                    <td>{contact.mobile}</td>
                    <td>{contact.email}</td>
                    <td>
                      <div className="actionCell">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/contacts/${contact.id}`);
                          }}
                          sx={{
                            textTransform: "none",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.78rem",
                            borderRadius: "6px",
                            padding: "3px 12px",
                          }}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={(e) => handleOpenDelete(e, contact.id)}
                          sx={{
                            textTransform: "none",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.78rem",
                            borderRadius: "6px",
                            padding: "3px 12px",
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="emptyState">
                      <PersonOutlineOutlinedIcon
                        sx={{ fontSize: 48, opacity: 0.3 }}
                      />
                      <p>No contacts found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteOpen && (
        <div className="deleteOverlay" onClick={handleCloseDelete}>
          <div className="deleteCard" onClick={(e) => e.stopPropagation()}>
            <div className="deleteAccent" />
            <div className="deleteBody">
              <h3>Delete Contact</h3>
              <p>
                This action cannot be undone. Type <strong>delete</strong> below
                to confirm.
              </p>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder='Type "delete" to confirm'
                value={deleteText}
                onChange={(e) => setDeleteText(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    fontFamily: "'DM Sans', sans-serif",
                  },
                }}
              />
            </div>
            <div className="deleteActions">
              <Button
                variant="outlined"
                onClick={handleCloseDelete}
                sx={{
                  textTransform: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  borderRadius: "8px",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled={deleteText !== "delete"}
                onClick={handleConfirmDelete}
                sx={{
                  textTransform: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  borderRadius: "8px",
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none" },
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
