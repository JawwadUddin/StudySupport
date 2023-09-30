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

const ContactForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contactInfo = location.state ? location.state.contactInfo : null;
  const familyID = location.state ? location.state.familyID : null;
  const [relationDropdown, setRelationDropdown] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postCode: "",
    mobile: "",
    email: "",
    ecFullName: "",
    ecRelation: "",
    ecAddress: "",
    ecPostCode: "",
    ecMobile: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});

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
  }, [contactInfo]);

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
      async function submitData() {
        let errorCount;
        errorCount = validateForm(dataToSubmit);
        if (errorCount !== 0) return;
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

  function cleanErrorObject(obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null) {
        delete obj[key];
      }
    });
  }
  const validateForm = (inputData) => {
    const _errors = {};
    _errors.firstName = validateInputs({
      data: inputData.firstName,
      type: "alpha",
      minLength: 2,
      maxLength: 20,
      required: true,
    });
    _errors.lastName = validateInputs({
      data: inputData.lastName,
      type: "alpha",
      minLength: 2,
      maxLength: 20,
      required: true,
    });
    _errors.mobile = validateInputs({
      data: inputData.mobile,
      type: "int",
      length: 11,
      required: true,
    });
    _errors.email = validateInputs({
      data: inputData.email,
      type: "email",
      required: false,
    });
    _errors.address = validateInputs({
      data: inputData.address,
      type: "alphaNumeric",
      minLength: 5,
      required: true,
    });
    _errors.postCode = validateInputs({
      data: inputData.postCode,
      type: "postcode",
      required: true,
    });
    _errors.ecFullName = validateInputs({
      data: inputData.ecFullName,
      type: "alpha",
      minLength: 2,
      maxLength: 20,
      required: true,
    });
    _errors.ecMobile = validateInputs({
      data: inputData.ecMobile,
      type: "int",
      length: 11,
      required: true,
    });
    _errors.ecRelation = validateInputs({
      data: inputData.ecRelation,
      required: true,
    });
    _errors.ecAddress = validateInputs({
      data: inputData.ecAddress,
      type: "alphaNumeric",
      required: false,
    });
    _errors.ecPostCode = validateInputs({
      data: inputData.ecPostCode,
      type: "postcode",
      required: false,
    });
    cleanErrorObject(_errors);
    setFormErrors(_errors);
    let errorCount = Object.keys(_errors).length;
    return errorCount;
  };

  const handleEdit = () => {
    try {
      let errorCount;
      errorCount = validateForm(dataToSubmit);
      if (errorCount !== 0) return;
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
    <div className="contactForm form">
      <h3>Contact Lead Information</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            variant="outlined"
            value={dataToSubmit.firstName}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            variant="outlined"
            value={dataToSubmit.lastName}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            error={!!formErrors.mobile}
            helperText={formErrors.mobile}
            id="mobile"
            name="mobile"
            label="Mobile Number"
            fullWidth
            variant="outlined"
            value={dataToSubmit.mobile}
            onChange={addData}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            error={!!formErrors.email}
            helperText={formErrors.email}
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            variant="outlined"
            value={dataToSubmit.email}
            onChange={addData}
            inputProps={{ type: "email" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={!!formErrors.address}
            helperText={formErrors.address}
            id="address"
            name="address"
            label="Address"
            fullWidth
            variant="outlined"
            value={dataToSubmit.address}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            required
            error={!!formErrors.postCode}
            helperText={formErrors.postCode}
            id="postCode"
            name="postCode"
            label="Post Code"
            fullWidth
            variant="outlined"
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
            error={!!formErrors.ecFullName}
            helperText={formErrors.ecFullName}
            id="fullNameEC"
            name="ecFullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            value={dataToSubmit.ecFullName}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            error={!!formErrors.ecMobile}
            helperText={formErrors.ecMobile}
            id="mobileEC"
            name="ecMobile"
            label="Mobile Number"
            fullWidth
            variant="outlined"
            value={dataToSubmit.ecMobile}
            onChange={addData}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Relation</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="relation"
              name="ecRelation"
              error={!!formErrors.ecRelation}
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
            id="addressEC"
            name="ecAddress"
            label="Address"
            fullWidth
            variant="outlined"
            value={dataToSubmit.ecAddress}
            onChange={addData}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            error={!!formErrors.ecPostCode}
            helperText={formErrors.ecPostCode}
            id="ecPostCode"
            name="ecPostCode"
            label="Post Code"
            fullWidth
            variant="outlined"
            value={dataToSubmit.ecPostCode}
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
