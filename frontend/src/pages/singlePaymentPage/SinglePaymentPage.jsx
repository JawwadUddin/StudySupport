import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import CircularProgress from "@mui/material/CircularProgress";
import PaymentForm from "../../components/paymentForm/PaymentForm";

const SinglePaymentPage = () => {
  const { familyID, paymentDate } = useParams();
  const [payment, setPayment] = useState();
  const [loading, setLoading] = useState(true);
  const {
    state: { firstName, lastName },
  } = useLocation();
  const formattedPaymentDate = paymentDate.split("-").reverse().join("-");

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/payment/${familyID}/${formattedPaymentDate}`
        );
        if (serverResponse.message === "OK") {
          setPayment(serverResponse.results.data);
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
    <div className="singleInvoicePageContainer">
      <h2 className="title">Receive Payment</h2>
      <div className="listContainer backgroundGrey">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {payment ? (
              <PaymentForm
                familyID={familyID}
                firstName={firstName}
                lastName={lastName}
                paymentDate={paymentDate}
                paymentInfo={payment.payment}
                paymentType={payment.paymentType}
              />
            ) : (
              <h2 className="title">Invoice Not Found</h2>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePaymentPage;
