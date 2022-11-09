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
          </Route>
          <Route path="/tests">
            <Route path="" element={<TestPage />} />
            <Route path=":testID" element={<SingleTestPage />} />
            <Route path="new" element={<NewTestPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
