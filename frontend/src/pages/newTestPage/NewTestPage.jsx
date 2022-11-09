import React from "react";
import "./newTestPage.css";
import TestForm from "../../components/testForm/TestForm";
import { useLocation } from "react-router-dom";

const NewTestPage = () => {
  const location = useLocation();
  const { id: syllabusID, syllabusName } = location.state
    ? location.state.syllabus
    : null;
  return (
    <div className="newTestPageContainer">
      <h2 className="title">{syllabusName} - Create New Test</h2>
      <div className="formContainer">
        <TestForm syllabusID={syllabusID} />
      </div>
    </div>
  );
};

export default NewTestPage;
