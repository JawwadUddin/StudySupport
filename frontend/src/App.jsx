import "./App.css";
import Sidebar from "./layout/sidebar/Sidebar";
import Navbar from "./layout/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboardPage/DashboardPage";
import ContactPage from "./pages/contactPage/ContactPage";
import StudentPage from "./pages/studentPage/StudentPage";
import TestPage from "./pages/testPage/TestPage";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="mainContainer">
        <Navbar />
        <Routes>
          <Route path="/*" element={<DashboardPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/tests" element={<TestPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
