import "./studentForm.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getData, saveData, updateData } from "../../helpers/apiFunctions";
import { validateInputs } from "../../helpers/validateInput";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const StudentForm = ({ idFamily }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const studentInfo = location.state ? location.state.studentInfo : null;
  const studentID = location.state ? location.state.studentID : null;

  const [familyID, setFamilyID] = useState(
    idFamily || (studentInfo ? studentInfo.familyID : "")
  );
  const [familyDropdown, setFamilyDropdown] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({
    fullName: "",
    familyID: familyID,
    DOB: "",
    schoolYear: "",
    school: "",
    medicalInfo: "",
    notes: "",
    levelID: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/family`
        );
        if (serverResponse.message === "OK") {
          setFamilyDropdown(serverResponse.results.data);
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
    if (studentInfo) {
      let dateArray = studentInfo.DOB.split("/");
      console.log(studentInfo);
      let formattedDOB = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
      setDataToSubmit({
        ...studentInfo,
        DOB: formattedDOB,
      });
    }
  }, [studentInfo]);

  const handleChange = (e, type) => {
    console.log(e, type);
    setFormErrors({});
    let updateData;
    if (type === "family") {
      setFamilyID(e.target.value);
      updateData = {
        ...dataToSubmit,
        familyID: e.target.value,
      };
    }
    if (type === "schoolYear") {
      updateData = {
        ...dataToSubmit,
        schoolYear: e.target.value,
      };
    }
    if (type === "levelID") {
      updateData = {
        ...dataToSubmit,
        levelID: e.target.value,
      };
    }
    setDataToSubmit((prev) => updateData);
  };

  const addData = (e) => {
    setFormErrors({});
    const updatedData = {
      ...dataToSubmit,
      [e.target.name]: e.target.value,
    };
    setDataToSubmit((prev) => updatedData);
  };

  const handleSubmit = () => {
    try {
      let errorCount;
      errorCount = validateForm(dataToSubmit);
      if (errorCount !== 0) return;
      async function submitData() {
        const serverResponse = await saveData(
          `${process.env.REACT_APP_API_URL}/api/student`,
          dataToSubmit
        );
        if (serverResponse.message === "OK") {
          const { newStudentID } = serverResponse.results.data;
          navigate(`/students/${newStudentID}`, { replace: true });
        } else {
          throw Error(serverResponse.message);
        }
      }
      submitData();
      console.log("submitting");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    try {
      let errorCount;
      errorCount = validateForm(dataToSubmit);
      if (errorCount !== 0) return;
      async function editData() {
        const serverResponse = await updateData(
          `${process.env.REACT_APP_API_URL}/api/student/${studentID}`,
          dataToSubmit
        );
        if (serverResponse.message === "OK") {
          navigate(-1);
        } else {
          throw Error(serverResponse.message);
        }
      }
      editData();
    } catch (error) {
      console.log(error);
    }
  };
  function cleanErrorObject(obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null) {
        delete obj[key];
      }
    });
  }
  const validateForm = (inputData) => {
    const _errors = {};
    _errors.fullName = validateInputs({
      data: inputData.fullName,
      type: "alpha",
      minLength: 2,
      maxLength: 20,
      required: true,
    });
    _errors.familyID = validateInputs({
      data: inputData.familyID,
      required: true,
    });
    _errors.DOB = validateInputs({
      data: inputData.DOB,
      required: true,
    });
    _errors.school = validateInputs({
      data: inputData.school,
      type: "alpha",
      required: false,
    });
    _errors.schoolYear = validateInputs({
      data: inputData.schoolYear,
      required: true,
    });
    _errors.levelID = validateInputs({
      data: inputData.levelID,
      required: true,
    });
    cleanErrorObject(_errors);
    setFormErrors(_errors);
    let errorCount = Object.keys(_errors).length;
    return errorCount;
  };

  return (
    <div className="studentForm">
      <h3>Student Information</h3>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={5}>
          <TextField
            required
            error={!!formErrors.fullName}
            helperText={formErrors.fullName}
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            value={dataToSubmit.fullName}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            error={!!formErrors.DOB}
            helperText={formErrors.DOB}
            required
            id="date"
            label="Birthday"
            type="date"
            name="DOB"
            value={dataToSubmit.DOB}
            onChange={addData}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Family</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="relation"
              error={!!formErrors.familyID}
              multiline
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
        <Grid item xs={12}>
          <Button onClick={() => navigate("/contacts/new")} variant="outlined">
            Create Family
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={!!formErrors.school}
            helperText={formErrors.school}
            id="school"
            name="school"
            label="School Name"
            fullWidth
            variant="outlined"
            value={dataToSubmit.school}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">School Year</InputLabel>
            <Select
              error={!!formErrors.schoolYear}
              labelId="demo-simple-select-label"
              id="schoolYear"
              value={dataToSubmit.schoolYear}
              onChange={(e) => handleChange(e, "schoolYear")}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={13}>13</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Level</InputLabel>
            <Select
              error={!!formErrors.levelID}
              id="level"
              value={dataToSubmit.levelID}
              onChange={(e) => handleChange(e, "levelID")}
            >
              <MenuItem value={1}>KS2</MenuItem>
              <MenuItem value={2}>11+</MenuItem>
              <MenuItem value={3}>KS3</MenuItem>
              <MenuItem value={4}>GCSE</MenuItem>
              <MenuItem value={5}>A-LEVEL</MenuItem>
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
            multiline
            value={dataToSubmit.notes}
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
            multiline
            value={dataToSubmit.medicalInfo}
            onChange={addData}
          />
        </Grid>
      </Grid>
      <div className="formEnd">
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          color="warning"
          className="cancelBtn"
        >
          Cancel
        </Button>
        {studentInfo ? (
          <Button
            onClick={handleEdit}
            variant="contained"
            color="secondary"
            className="editBtn"
          >
            Edit Student
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="submitBtn"
          >
            Add Student
          </Button>
        )}
      </div>
    </div>
  );
};

export default StudentForm;
