import PaymentForm from "../../components/paymentForm/PaymentForm";
import { useLocation } from "react-router-dom";

const NewPaymentPage = () => {
  const {
    state: { familyID },
  } = useLocation();
  return (
    <div className="newPaymentPageContainer">
      <h2 className="title">New Payment</h2>
      <div className="formContainer backgroundGrey">
        <PaymentForm familyID={familyID} />
      </div>
    </div>
  );
};

export default NewPaymentPage;
