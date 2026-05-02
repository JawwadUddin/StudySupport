import ExcelReport from "../../components/excelReport/ExcelReport";
import "./dashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboardPage">
      <div className="pageHeader">
        <h2>Reports</h2>
        <div className="subtitle">Generate and download transaction reports</div>
      </div>
      <div className="dashboardCard">
        <ExcelReport />
      </div>
    </div>
  );
};

export default DashboardPage;
