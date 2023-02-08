import { useEffect, useState } from "react";
import { getData } from "../../helpers/apiFunctions";
import "./registerPage.css";

const RegisterPage = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/register/2023-02-04`
        );
        if (serverResponse.message === "OK") {
          setSessions(serverResponse.results.data[0]?.sessions);
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
    <div className="registerPageContainer">
      <h2 className="title">Register</h2>
      <div className="listContainer">
        <div className="listHeader">
          <div className="listTitle">Register</div>
        </div>
        {sessions.length !== 0 &&
          sessions.map((session) => {
            return (
              <div className="sessionContainer">
                <h3
                  style={{
                    marginBottom: "20px",
                    textAlign: "center",
                    color: "#9c27b0",
                  }}
                >
                  {session.session_time}
                </h3>
                <div className="tableContainer">
                  {session.tables.map((table) => {
                    return (
                      <div className="tableContent">
                        <h4 className="tableHeader">{table.session_table}</h4>
                        <div className="tableContainer">
                          {table.students
                            ? table.students.map((student) => {
                                return (
                                  <div className="tableStudent">
                                    {student.full_name}
                                  </div>
                                );
                              })
                            : "Empty"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RegisterPage;
