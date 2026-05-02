import InvoiceForm from "../../components/invoiceForm/InvoiceForm";
import { useLocation } from "react-router-dom";

const NewInvoicePage = () => {
  const location = useLocation();
  const familyID = location.state ? location.state.familyID : null;
  return (
    <div className="invoiceFormPage">
      <div className="pageHeader">
        <h2>New Invoice</h2>
        <div className="subtitle">Create a new invoice</div>
      </div>
      <div className="formCard">
        {familyID ? <InvoiceForm familyID={familyID} /> : <InvoiceForm />}
      </div>
    </div>
  );
};

export default NewInvoicePage;
