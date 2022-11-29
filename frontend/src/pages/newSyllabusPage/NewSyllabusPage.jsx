import React from "react";
import SyllabusForm from "../../components/syllabusForm/SyllabusForm";
import "./newSyllabusPage.css";

const NewSyllabusPage = () => {
  return (
    <div className="newSyllabusPageContainer">
      <h2 className="title">Create New Syllabus</h2>
      <div className="formContainer">
        <SyllabusForm />
      </div>
    </div>
  );
};

export default NewSyllabusPage;
