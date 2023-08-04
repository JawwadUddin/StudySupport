import ContactForm from "../../components/contactForm/ContactForm";
import { useLocation } from "react-router-dom";

const NewContactPage = () => {
  const location = useLocation();
  const familyID = location.state ? location.state.familyID : "";

  return (
    <div className="newContactPageContainer">
      <h2 className="title">{familyID ? "Edit Contact" : "New Contact"}</h2>
      <div className="formContainer">
        <ContactForm />
      </div>
    </div>
  );
};

export default NewContactPage;
