import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import CircularProgress from "@mui/material/CircularProgress";
import InvoiceForm from "../../components/invoiceForm/InvoiceForm";

const SingleInvoicePage = () => {
  let { invoiceID } = useParams();
  const [invoice, setInvoice] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/invoice/${invoiceID}`
        );
        if (serverResponse.message === "OK") {
          setInvoice(serverResponse.results.data);
          setLoading(false);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="invoiceFormPage">
      <div className="pageHeader">
        <h2>Invoice No. {invoiceID}</h2>
        <div className="subtitle">View and manage invoice details</div>
      </div>
      <div className="formCard">
        {loading ? (
          <div className="loadingContainer">
            <CircularProgress />
          </div>
        ) : (
          <>
            {invoice ? (
              <InvoiceForm invoiceInfo={invoice} />
            ) : (
              <p>Invoice not found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleInvoicePage;
