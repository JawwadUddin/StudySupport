import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";

const SingleStudentPage = () => {
  let { studentID } = useParams();
  const [student, setStudent] = useState();
  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `http://localhost:5000/api/student/${studentID}`
        );
        if (serverResponse.message === "OK") {
          setStudent(serverResponse.results);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <div>{JSON.stringify(student)}</div>;
};

export default SingleStudentPage;
