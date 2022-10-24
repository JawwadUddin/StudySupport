import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";

const SingleContactPage = () => {
  let { contactID } = useParams();
  const [contact, setContact] = useState();
  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `http://localhost:5000/api/family/${contactID}`
        );
        if (serverResponse.message === "OK") {
          setContact(serverResponse.results);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <div>{JSON.stringify(contact)}</div>;
};

export default SingleContactPage;
