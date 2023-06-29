import "./App.css";
import Sidebar from "./layout/sidebar/Sidebar";
import Navbar from "./layout/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboardPage/DashboardPage";
import ContactPage from "./pages/contactPage/ContactPage";
import NewContactPage from "./pages/newContactPage/NewContactPage";
import NewStudentPage from "./pages/newStudentPage/NewStudentPage";
import StudentPage from "./pages/studentPage/StudentPage";
import TestPage from "./pages/testPage/TestPage";
import SingleStudentPage from "./pages/singleStudentPage/SingleStudentPage";
import SingleContactPage from "./pages/singleContactPage/SingleContactPage";
import SingleTestPage from "./pages/singleTestPage/SingleTestPage";
import NewTestPage from "./pages/newTestPage/NewTestPage";
import ScorePage from "./pages/scorePage/ScorePage";
import NewScorePage from "./pages/newScorePage/NewScorePage";
import SyllabusPage from "./pages/syllabusPage/SyllabusPage";
import NewSyllabusPage from "./pages/newSyllabusPage/NewSyllabusPage";
import TopicPage from "./pages/topicPage/TopicPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import NewRegisterPage from "./pages/newRegisterPage/NewRegisterPage";
import SingleInvoicePage from "./pages/singleInvoicePage/SingleInvoicePage";
import NewInvoicePage from "./pages/newInvoicePage/newInvoicePage";
import NewPaymentPage from "./pages/newPaymentPage/NewPaymentPage";
import SinglePaymentPage from "./pages/singlePaymentPage/SinglePaymentPage";
import TransactionPage from "./pages/transactionPage/TransactionPage";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="mainContainer">
        <Navbar />
        <Routes>
          <Route path="/*" element={<DashboardPage />} />
          <Route path="/contacts">
            <Route path="" element={<ContactPage />} />
            <Route path=":contactID" element={<SingleContactPage />} />
            <Route path=":contactID/edit" element={<NewContactPage />} />
            <Route path="new" element={<NewContactPage />} />
          </Route>
          <Route path="/students">
            <Route path="" element={<StudentPage />} />
            <Route path=":studentID" element={<SingleStudentPage />} />
            <Route path=":studentID/edit" element={<NewStudentPage />} />
            <Route path="new" element={<NewStudentPage />} />
            <Route path=":studentID/:testName" element={<ScorePage />} />
            <Route
              path=":studentID/:testName/edit"
              element={<NewScorePage />}
            />
            <Route path=":studentID/newTest" element={<NewScorePage />} />
          </Route>
          <Route path="syllabus">
            <Route path="" element={<SyllabusPage />} />
            <Route path="new" element={<NewSyllabusPage />} />
            <Route path=":syllabusID/topics" element={<TopicPage />} />
            <Route
              path=":syllabusID/topics/edit"
              element={<NewSyllabusPage />}
            />
            <Route path=":syllabusID/tests" element={<TestPage />} />
            <Route
              path=":syllabusID/tests/:testID"
              element={<SingleTestPage />}
            />
            <Route
              path=":syllabusID/tests/:testID/edit"
              element={<NewTestPage />}
            />
            <Route path=":syllabusID/tests/new" element={<NewTestPage />} />
          </Route>
          <Route path="register">
            <Route path="" element={<RegisterPage />} />
            <Route path="new" element={<NewRegisterPage />} />
          </Route>
          <Route path="transactions">
            <Route path="" element={<TransactionPage />} />
          </Route>
          <Route path="invoices">
            <Route path="" element={<TransactionPage />} />
            <Route path="new" element={<NewInvoicePage />} />
            <Route path=":invoiceID" element={<SingleInvoicePage />} />
          </Route>
          <Route path="payments">
            {/* <Route path="" element={<InvoicePage />} /> */}
            <Route path="new" element={<NewPaymentPage />} />
            <Route
              path=":familyID/:paymentDate"
              element={<SinglePaymentPage />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
