import "./studentForm.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, saveData } from "../../helpers/apiFunctions";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

const StudentForm = ({ idFamily }) => {
  const navigate = useNavigate();
  const [familyID, setFamilyID] = useState(idFamily);
  const [formError, setFormError] = useState(true);
  const [date, setDate] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [familyDropdown, setFamilyDropdown] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({
    fullName: "",
    familyID: familyID,
    DOB: "",
    schoolYear: 0,
    school: "",
    medicalInfo: "",
    notes: "",
  });

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/family`
        );
        if (serverResponse.message === "OK") {
          setFamilyDropdown(serverResponse.results.data);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e, type) => {
    let updateData;
    if (type === "family") {
      setFamilyID(e.target.value);
      updateData = {
        ...dataToSubmit,
        familyID: e.target.value,
      };
    }
    if (type === "schoolYear") {
      setSchoolYear(e.target.value);
      updateData = {
        ...dataToSubmit,
        schoolYear: e.target.value,
      };
    }
    setDataToSubmit((prev) => updateData);
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
    if (newValue.$d == "Invalid Date") {
      setFormError(true);
      return;
    }
    setFormError(false);
    const updateData = {
      ...dataToSubmit,
      DOB: `${newValue.$M + 1}/${newValue.$D}/${newValue.$y}`,
    };
    setDataToSubmit((prev) => updateData);
  };

  const addData = (e) => {
    const updatedData = {
      ...dataToSubmit,
      [e.target.name]: e.target.value,
    };
    setDataToSubmit((prev) => updatedData);
  };

  const handleSubmit = () => {
    try {
      async function submitData() {
        const serverResponse = await saveData(
          `${process.env.REACT_APP_API_URL}/api/student`,
          dataToSubmit
        );
        console.log(serverResponse);
        if (serverResponse.message === "OK") {
          const { newStudentID } = serverResponse.results.data;
          navigate(`/students/${newStudentID}`, { replace: true });
        }
      }
      formError ? console.log("Form Error") : submitData();
      console.log(dataToSubmit);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="studentForm">
      <h3>Student Information</h3>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={5}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date of Birth"
              inputFormat="DD/MM/YYYY"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Family</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="relation"
              value={familyID}
              onChange={(e) => handleChange(e, "family")}
            >
              {familyDropdown.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.fullName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="school"
            name="school"
            label="School Name"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">School Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="schoolYear"
              value={schoolYear}
              onChange={(e) => handleChange(e, "schoolYear")}
            >
              <MenuItem value={7}>4</MenuItem>
              <MenuItem value={7}>5</MenuItem>
              <MenuItem value={7}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={12}>13</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <h3>Notes</h3>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="notes"
            name="notes"
            label="Notes"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
        </Grid>
      </Grid>
      <h3>Medical Information</h3>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="medicalInfo"
            name="medicalInfo"
            label="Medical Information"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
        </Grid>
      </Grid>
      <div className="formEnd">
        <Button
          onClick={handleSubmit}
          variant="contained"
          className="submitBtn"
        >
          Add Student
        </Button>
      </div>
    </div>
  );
};

export default StudentForm;
