import { useState, useEffect } from "react";
import { getData, saveData } from "../../helpers/apiFunctions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import "./registerForm.css";

const RegisterForm = () => {
  const [registerDate, setRegisterDate] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [templateError, setTemplateError] = useState("");
  const [sessionDate, setSessionDate] = useState([]);
  const [sessionDateID, setSessionDateID] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function fetchSessionDates() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/sessionDate`,
        );
        if (serverResponse.message === "OK") {
          setSessionDate(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchSessionDates();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleBlankCanvas() {
    if (registerDate === "") {
      setRegisterError("This is a required field");
      return;
    }
    try {
      async function createRegisterBlank() {
        const serverResponse = await saveData(
          `${process.env.REACT_APP_API_URL}/api/sessionDate`,
          registerDate,
        );
        if (serverResponse.message === "OK") {
          const { newSessionDateID } = serverResponse.results.data;
          navigate("/register", { state: { newSessionDateID }, replace: true });
        } else {
          throw Error(serverResponse.message);
        }
      }
      createRegisterBlank();
    } catch (error) {
      console.log(error);
    }
  }

  function handleGenerateTemplate() {
    if (registerDate === "") {
      setRegisterError("This is a required field");
      return;
    }
    if (sessionDateID === "") {
      setTemplateError("This is a required field");
      return;
    }
    try {
      async function createRegisterTemplate() {
        const serverResponse = await saveData(
          `${process.env.REACT_APP_API_URL}/api/register`,
          { registerDate, templateID: sessionDateID },
        );
        if (serverResponse.message === "OK") {
          const { newSessionDateID } = serverResponse.results.data;
          navigate("/register", { state: { newSessionDateID }, replace: true });
        } else {
          throw Error(serverResponse.message);
        }
      }
      createRegisterTemplate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="registerFormContainer">
      <div className="datePickerSection">
        <label className="sectionLabel">Register Date</label>
        <TextField
          required
          error={registerError.length !== 0}
          helperText={registerError}
          id="date"
          type="date"
          name="date"
          value={registerDate}
          onChange={(e) => {
            setRegisterDate(e.target.value);
            setRegisterError("");
          }}
          size="small"
          sx={{
            width: 220,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              fontFamily: "'DM Sans', sans-serif",
            },
          }}
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <div className="optionCards">
        <div className="optionCard">
          <div className="cardAccent blankAccent" />
          <div className="cardContent">
            <h3>Blank Canvas</h3>
            <p>Start from scratch with an empty register for the selected date.</p>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleBlankCanvas()}
              sx={{
                marginTop: "auto",
                textTransform: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                borderRadius: "8px",
              }}
            >
              Create Blank
            </Button>
          </div>
        </div>

        <div className="optionCard">
          <div className="cardAccent templateAccent" />
          <div className="cardContent">
            <h3>From Template</h3>
            <p>Copy an existing register as a starting point.</p>
            <FormControl fullWidth size="small" sx={{ marginBottom: "16px" }}>
              <InputLabel id="template-select-label">Template Date</InputLabel>
              <Select
                error={templateError.length !== 0}
                labelId="template-select-label"
                label="Template Date"
                MenuProps={{
                  PaperProps: { style: { maxHeight: 300 } },
                }}
                value={sessionDateID}
                onChange={(e) => {
                  setSessionDateID(e.target.value);
                  setTemplateError("");
                }}
                sx={{
                  borderRadius: "8px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {sessionDate.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.sessionDate}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleGenerateTemplate()}
              sx={{
                textTransform: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                borderRadius: "8px",
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              }}
            >
              Generate Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
