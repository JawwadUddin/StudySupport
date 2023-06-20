import InvoiceForm from "../../components/invoiceForm/InvoiceForm";
import "./newInvoicePage.css";

const NewInvoicePage = () => {
  return (
    <div className="newInvoicePageContainer">
      <h2 className="title">New Invoice</h2>
      <div className="formContainer">
        <InvoiceForm />
      </div>
    </div>
  );
};

export default NewInvoicePage;
