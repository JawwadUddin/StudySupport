import React from "react";
import "./syllabusPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const SyllabusPage = () => {
  const [syllabuses, setSyllabuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponseSyllabus = await getData(
          `${process.env.REACT_APP_API_URL}/api/syllabus`
        );
        if (serverResponseSyllabus.message === "OK") {
          setSyllabuses(serverResponseSyllabus.results.data);
        } else {
          throw Error(serverResponseSyllabus.message);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="syllabusPageContainer">
      <h2 className="title">Syllabuses</h2>
      <Grid container>
        <Grid item xs={12}>
          <div className="listContainer">
            <div className="listTitle">All Syllabuses</div>
            {syllabuses.map((syllabus, index) => {
              return (
                <Table key={index}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {syllabus.syllabusName}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          navigate(`${syllabus.id}/tests`, {
                            state: { syllabusName: syllabus.syllabusName },
                          })
                        }
                        variant="outlined"
                        className="createBtn"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </Table>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SyllabusPage;
