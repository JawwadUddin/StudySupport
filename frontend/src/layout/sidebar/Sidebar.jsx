import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">StudySupport</span>
      </div>
      <div className="center">
        <ul>
          <li onClick={() => navigate("")}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <li onClick={() => navigate("contacts")}>
            <ImportContactsIcon className="icon" />
            <span>Contacts</span>
          </li>
          <li onClick={() => navigate("students")}>
            <PersonOutlineOutlinedIcon className="icon" />
            <span>Students</span>
          </li>
          <li onClick={() => navigate("syllabus")}>
            <QuizIcon className="icon" />
            <span>Syllabuses</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
