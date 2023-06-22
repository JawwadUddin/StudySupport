import "./newPaymentPage.css";
import PaymentForm from "../../components/paymentForm/PaymentForm";

const NewPaymentPage = () => {
  return (
    <div className="newPaymentPageContainer">
      <h2 className="title">New Payment</h2>
      <div className="formContainer">
        <PaymentForm />
      </div>
    </div>
  );
};

export default NewPaymentPage;
