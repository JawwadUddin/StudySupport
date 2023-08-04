import ScoreForm from "../../components/scoreForm/ScoreForm";

const NewScorePage = () => {
  return (
    <div className="newScorePageContainer">
      <h2 className="title">Insert New Test Scores</h2>
      <div className="formContainer">
        <ScoreForm />
      </div>
    </div>
  );
};

export default NewScorePage;
