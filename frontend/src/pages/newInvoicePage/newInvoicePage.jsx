import InvoiceForm from "../../components/invoiceForm/InvoiceForm";
import "./newInvoicePage.css";
import { useLocation } from "react-router-dom";

const NewInvoicePage = () => {
  const {
    state: { familyID },
  } = useLocation();
  return (
    <div className="newInvoicePageContainer">
      <h2 className="title">New Invoice</h2>
      <div className="formContainer">
        <InvoiceForm familyID={familyID} />
      </div>
    </div>
  );
};

export default NewInvoicePage;
