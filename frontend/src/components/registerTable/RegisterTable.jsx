import { useState, useEffect } from "react";
import "./registerTable.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const RegisterTable = ({ sessions }) => {
  const [register, setRegister] = useState([]);

  useEffect(() => {
    setRegister(sessions);
  }, [sessions]);

  return (
    <div>
      {register.map((session, index) => {
        return (
          <div key={index}>
            <h2 className="session-time">{session.session_time}</h2>
            <div className="tables-container">
              {session.tables.map((table, index) => {
                return (
                  <div key={index} className="table">
                    <h3 className="table-name">{table.session_table}</h3>
                    <div className="table-items">
                      {table.students?.map((student, index) => {
                        return (
                          <div key={index} className="student">
                            <div className="student-name">
                              {student.full_name}
                              {student.compensation_id && (
                                <div className="compensation-tag"></div>
                              )}
                            </div>
                            <div className="student-attendance">
                              {student.attendance ? (
                                <CheckCircleIcon className="present-icon" />
                              ) : (
                                <CancelIcon className="absent-icon" />
                              )}
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
      })}
    </div>
  );
};

export default RegisterTable;
