import ContactForm from "../../components/contactForm/ContactForm";
import { useLocation } from "react-router-dom";

const NewContactPage = () => {
  const location = useLocation();
  const familyID = location.state ? location.state.familyID : "";

  return (
    <div className="contactFormPage">
      <div className="pageHeader">
        <h2>{familyID ? "Edit Contact" : "New Contact"}</h2>
        <div className="subtitle">
          {familyID
            ? "Update contact information"
            : "Add a new contact to your records"}
        </div>
      </div>
      <div className="formCard">
        <ContactForm />
      </div>
    </div>
  );
};

export default NewContactPage;
