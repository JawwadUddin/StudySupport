import "./newContactPage.css";
import ContactForm from "../../components/contactForm/ContactForm";

const NewContactPage = () => {
  return (
    <div className="newContactPageContainer">
      <h2 className="title">New Contact</h2>
      <div className="formContainer">
        <ContactForm />
      </div>
    </div>
  );
};

export default NewContactPage;
