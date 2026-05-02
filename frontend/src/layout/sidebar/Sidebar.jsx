import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import QuizIcon from "@mui/icons-material/Quiz";
import DescriptionIcon from "@mui/icons-material/Description";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/ss-logo.svg";

const navItems = [
  { label: "Customers", icon: DashboardIcon, path: "customers" },
  { label: "Invoices", icon: DescriptionIcon, path: "invoices" },
  { label: "Payments", icon: PaymentIcon, path: "payments" },
  { label: "Register", icon: AppRegistrationIcon, path: "register" },
  { label: "Contacts", icon: ImportContactsIcon, path: "contacts" },
  { label: "Students", icon: PersonOutlineOutlinedIcon, path: "students" },
  { label: "Syllabuses", icon: QuizIcon, path: "syllabus" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === `/${path}` || location.pathname.startsWith(`/${path}/`);
  };

  return (
    <div className="sidebar">
      <div className="sidebarBrand" onClick={() => navigate("/")}>
        <img src={logo} alt="StudySupport" className="sidebarLogo" />
      </div>
      <nav className="sidebarNav">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li
                key={item.path}
                className={active ? "navItem active" : "navItem"}
                onClick={() => navigate(item.path)}
              >
                <div className="navItemHighlight" />
                <Icon className="navIcon" />
                <span className="navLabel">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
