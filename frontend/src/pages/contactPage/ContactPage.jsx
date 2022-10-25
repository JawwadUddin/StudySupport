import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./contactPage.scss";
import Table from "../../components/table/Table";
import Button from "@mui/material/Button";
import { getData } from "../../helpers/apiFunctions";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/family`
        );
        if (serverResponse.message === "OK") {
          setContacts(serverResponse.results.data);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="contactPageContainer">
      <h2 className="title">Contacts</h2>
      <div className="listContainer">
        <div className="listHeader">
          <div className="listTitle">All Contacts</div>
          <Button
            onClick={() => navigate("/contacts/new")}
            variant="contained"
            className="createBtn"
          >
            Create New Contact
          </Button>
        </div>
        <Table data={contacts} type="contact" />
      </div>
    </div>
  );
};

export default ContactPage;
