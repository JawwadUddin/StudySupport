import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, saveData } from "../../helpers/apiFunctions";
import "./contactForm.scss";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const ContactForm = () => {
  const navigate = useNavigate();
  const [relation, setRelation] = useState("");
  const [relationDropdown, setRelationDropdown] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({
    fullName: "",
    address: "",
    postCode: "",
    mobile: 0,
    email: "",
    ecFullName: "",
    ecRelation: "",
    ecAddress: "",
    ecMobile: "",
    notes: "",
  });

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          "http://localhost:5000/api/relation"
        );
        if (serverResponse.message === "OK") {
          setRelationDropdown(serverResponse.results.data);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e) => {
    setRelation(e.target.value);
    const updateData = {
      ...dataToSubmit,
      ecRelation: e.target.value,
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
          "http://localhost:5000/api/family",
          dataToSubmit
        );
        if (serverResponse.message === "OK") {
          navigate("/contacts", { replace: true });
        }
      }
      submitData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contactForm">
      <h3>Contact Lead Information</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobile"
            name="mobile"
            label="Mobile Number"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="postCode"
            name="postCode"
            label="Post Code"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
        </Grid>
      </Grid>
      <h3>Emergency Contact Information</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fullNameEC"
            name="ecFullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Relation</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="relation"
              value={relation}
              onChange={handleChange}
            >
              {relationDropdown.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.relationToChild}>
                    {item.relationToChild}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobileEC"
            name="ecMobile"
            label="Mobile Number"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="addressEC"
            name="ecAddress"
            label="Address"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="postCodeEC"
            name="ecPostCode"
            label="Post Code"
            fullWidth
            variant="outlined"
            onChange={addData}
          />
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
      <div className="formEnd">
        <Button
          onClick={handleSubmit}
          variant="contained"
          className="submitBtn"
        >
          Add Contact
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
