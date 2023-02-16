import { useEffect, useState } from "react";
import { getData } from "../../../helpers/apiFunctions";
import "./registerPage.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";

const RegisterPageOld = () => {
  const [sessions, setSessions] = useState([]);

  let attendance = [];

  const EditRegisterBtn = ({ session }) => {
    const [editMode, setEditMode] = useState(false);
    console.log(session);

    return (
      <div className="listHeader">
        {editMode ? (
          <Button
            onClick={() => {
              setEditMode(false);
            }}
            variant="outlined"
            color="warning"
            className="cancelBtn"
          >
            Cancel
          </Button>
        ) : (
          <Button
            onClick={() => {
              setEditMode(true);
            }}
            variant="contained"
            color="secondary"
            className="editBtn"
          >
            Edit Register
          </Button>
        )}
      </div>
    );
  };

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/register/1`
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

  useEffect(() => {
    try {
      function updateRegister() {
        sessions.map((session, index1) => [
          session.tables.map((table) => {
            let domTable = document.getElementById(
              index1 + table.session_table
            );
            table?.students?.map((student, index2) => {
              let position;
              if (index2 < 2) {
                position = 0;
              } else if (index2 < 4) {
                position = 1;
              } else if (index2 < 6) {
                position = 2;
              }
              // console.log(domTable.childNodes[position].childNodes[index2 % 2]);
              let studentSeat =
                domTable.childNodes[position].childNodes[index2 % 2];
              studentSeat.setAttribute("id", student.student_session_id);
              studentSeat.addEventListener("click", () => handleClick(student));
              studentSeat.style.cursor = "pointer";
              studentSeat.style.hover = "pointer";
              let seat = studentSeat.getElementsByClassName("studentName")?.[0];
              let icon = studentSeat.getElementsByClassName("icon")?.[0];
              seat && (seat.innerText = student.full_name);
              icon && (icon.style.color = student.attendance ? "green" : "red");
            });
          }),
        ]);
      }
      updateRegister();
    } catch (error) {
      console.log(error);
    }
  }, [sessions]);

  useEffect(() => {
    sessions.map((session) => {
      session.tables.map((table) => {
        table.students?.map((student) => {
          attendance.push(student);
        });
      });
    });
    console.log(attendance);
  }, sessions);

  function handleClick(student) {
    let icon = document
      .getElementById(student.student_session_id)
      .getElementsByClassName("icon")?.[0];
    // console.log(icon.style.color);
    console.log(icon.style.color);
    // console.log(icon.style.color === "green" ? "red" : "green");
    // let newColor = icon.style.color === "green" ? "red" : "green";
    // icon.style.color = icon.style.color === "green" ? "red" : "green";
  }

  return (
    <div className="registerPageContainer">
      <h2 className="title">Register</h2>
      <div className="listContainer">
        <div className="listHeader">
          <div className="listTitle">Register</div>
        </div>
        {sessions.length !== 0
          ? sessions.map((session, index) => {
              return (
                <>
                  <h3
                    style={{
                      marginBottom: "20px",
                      textAlign: "center",
                      color: "#9c27b0",
                    }}
                  >
                    {session.session_time}
                  </h3>
                  <EditRegisterBtn session={session} />
                  <div className="register">
                    <div id={index + "A"}>
                      <div className="table top-orient" id="table1">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table left-orient" id="table2">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table bottom-orient" id="table3">
                        <div className="student">
                          <div className="studentName"></div>
                          <AccountCircleIcon className="icon" />
                        </div>
                        <div className="student">
                          <div className="studentName"></div>
                          <AccountCircleIcon className="icon" />
                        </div>
                      </div>
                    </div>
                    <div id={index + "B"}>
                      <div className="table top-orient" id="table4">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table top-orient" id="table5">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table top-orient" id="table6">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                    </div>
                    <div id={index + "C"}>
                      <div className="table left-orient" id="table19">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table top-orient" id="table7">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                    </div>
                    <div id={index + "D"}>
                      <div className="table top-orient" id="table8">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table top-orient" id="table9">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                    </div>
                    <div id={index + "E"}>
                      <div className="table left-orient" id="table10">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table top-orient" id="table11">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table bottom-orient" id="table12">
                        <div className="student">
                          <div className="studentName"></div>
                          <AccountCircleIcon className="icon" />
                        </div>
                        <div className="student">
                          <div className="studentName"></div>
                          <AccountCircleIcon className="icon" />
                        </div>
                      </div>
                    </div>
                    <div id={index + "F"}>
                      <div className="table left-orient" id="table13">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table top-orient" id="table14">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table bottom-orient" id="table15">
                        <div className="student">
                          <div className="studentName"></div>
                          <AccountCircleIcon className="icon" />
                        </div>
                        <div className="student">
                          <div className="studentName"></div>
                          <AccountCircleIcon className="icon" />
                        </div>
                      </div>
                    </div>
                    <div id={index + "G"}>
                      <div className="table top-orient" id="table16">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table left-orient" id="table17">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                      <div className="table right-orient" id="table18">
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                        <div className="student">
                          <AccountCircleIcon className="icon" />
                          <div className="studentName"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          : "No records found"}
      </div>
    </div>
  );
};

export default RegisterPageOld;
