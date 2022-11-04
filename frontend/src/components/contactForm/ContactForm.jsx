import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getData, saveData, updateData } from "../../helpers/apiFunctions";
import "./contactForm.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const ContactForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contactInfo = location.state ? location.state.contactInfo : null;
  const familyID = location.state ? location.state.familyID : null;

  // const [relation, setRelation] = useState("");
  const [relationDropdown, setRelationDropdown] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({
    fullName: "",
    address: "",
    postCode: "",
    mobile: null,
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
          `${process.env.REACT_APP_API_URL}/api/relation`
        );
        if (serverResponse.message === "OK") {
          setRelationDropdown(serverResponse.results.data);
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
    if (contactInfo) {
      setDataToSubmit({ ...contactInfo });
    }
  }, []);

  // const handleChange = (e) => {
  //   setRelation(e.target.value);
  //   const updateData = {
  //     ...dataToSubmit,
  //     ecRelation: e.target.value,
  //   };
  //   setDataToSubmit((prev) => updateData);
  // };

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
          `${process.env.REACT_APP_API_URL}/api/family`,
          dataToSubmit
        );
        if (serverResponse.message === "OK") {
          const { newFamilyID } = serverResponse.results.data;
          navigate(`/contacts/${newFamilyID}`, { replace: true });
        } else {
          throw Error(serverResponse.message);
        }
      }
      submitData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    try {
      async function editData() {
        const serverResponse = await updateData(
          `${process.env.REACT_APP_API_URL}/api/family/${familyID}`,
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

  return (
    <div className="contactForm">
      <h3>Contact Lead Information</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            multiline
            value={dataToSubmit.fullName}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="mobile"
            name="mobile"
            label="Mobile Number"
            fullWidth
            variant="outlined"
            multiline
            value={dataToSubmit.mobile}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            variant="outlined"
            multiline
            value={dataToSubmit.email}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            variant="outlined"
            multiline
            value={dataToSubmit.address}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            required
            id="postCode"
            name="postCode"
            label="Post Code"
            fullWidth
            variant="outlined"
            multiline
            value={dataToSubmit.postCode}
            onChange={addData}
          />
        </Grid>
      </Grid>
      <h3>Emergency Contact Information</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="fullNameEC"
            name="ecFullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            multiline
            value={dataToSubmit.ecFullName}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="mobileEC"
            name="ecMobile"
            label="Mobile Number"
            fullWidth
            variant="outlined"
            multiline
            value={dataToSubmit.ecMobile}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Relation</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="relation"
              name="ecRelation"
              value={dataToSubmit.ecRelation}
              onChange={addData}
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
            id="addressEC"
            name="ecAddress"
            label="Address"
            fullWidth
            variant="outlined"
            multiline
            value={dataToSubmit.ecAddress}
            onChange={addData}
          />
        </Grid>
        {/* <Grid item xs={12} sm={2}>
          <TextField
            required
            id="postCodeEC"
            name="ecPostCode"
            label="Post Code"
            fullWidth
            variant="outlined"
            multiline
            value={dataToSubmit.ecPostCode}
            onChange={addData}
          />
        </Grid> */}
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
      <div className="formEnd">
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          color="warning"
          className="cancelBtn"
        >
          Cancel
        </Button>
        {contactInfo ? (
          <Button
            onClick={handleEdit}
            variant="contained"
            color="secondary"
            className="editBtn"
          >
            Edit Contact
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="submitBtn"
          >
            Add Contact
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
