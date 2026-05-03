import PaymentForm from "../../components/paymentForm/PaymentForm";
import { useLocation } from "react-router-dom";

const NewPaymentPage = () => {
  const location = useLocation();
  const familyID = location.state ? location.state.familyID : null;
  return (
    <div className="paymentFormPage">
      <div className="pageHeader">
        <h2>New Payment</h2>
        <div className="subtitle">Record a new payment</div>
      </div>
      <div className="formCard">
        <PaymentForm familyID={familyID} />
      </div>
    </div>
  );
};

export default NewPaymentPage;
