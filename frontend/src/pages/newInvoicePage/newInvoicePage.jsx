import InvoiceForm from "../../components/invoiceForm/InvoiceForm";
import { useLocation } from "react-router-dom";

const NewInvoicePage = () => {
  const location = useLocation();
  const familyID = location.state ? location.state.familyID : null;
  return (
    <div className="newInvoicePageContainer">
      <h2 className="title">New Invoice</h2>
      <div className="formContainer backgroundGrey">
        {familyID ? <InvoiceForm familyID={familyID} /> : <InvoiceForm />}
      </div>
    </div>
  );
};

export default NewInvoicePage;
