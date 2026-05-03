import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboardPage.css";
import { getData } from "../../helpers/apiFunctions";
import ExcelReport from "../../components/excelReport/ExcelReport";
import { BarChart } from "@mui/x-charts/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import GroupsIcon from "@mui/icons-material/Groups";

const QUICK_ACTIONS = [
  {
    label: "Create Invoice",
    path: "/invoices/new",
    icon: ReceiptLongIcon,
    color: "#0075c5",
  },
  {
    label: "Record Payment",
    path: "/payments/new",
    icon: PaymentIcon,
    color: "#16a34a",
  },
  {
    label: "Register",
    path: "/register/new",
    icon: HowToRegIcon,
    color: "#d97706",
  },
  {
    label: "Add Contact",
    path: "/contacts/new",
    icon: GroupsIcon,
    color: "#e05a33",
  },
  {
    label: "Add Student",
    path: "/students/new",
    icon: PersonAddIcon,
    color: "#7c3aed",
  },
];

const MONTH_NAMES = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await getData(
        `${process.env.REACT_APP_API_URL}/api/dashboard/summary`,
      );
      if (response.message === "OK") {
        setDashboardData(response.results.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getRevenueThisMonth = () => {
    if (!dashboardData?.monthlyPayments?.length) return 0;
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const match = dashboardData.monthlyPayments.find(
      (row) => row.month === currentMonth && row.year === currentYear,
    );
    return match ? Number(match.totalAmount) : 0;
  };

  const getChartData = () => {
    if (!dashboardData?.monthlyPayments?.length)
      return { months: [], amounts: [] };
    const sorted = [...dashboardData.monthlyPayments]
      .sort((a, b) => a.year - b.year || a.month - b.month)
      .slice(-6);
    return {
      months: sorted.map(
        (r) => `${MONTH_NAMES[r.month]} '${String(r.year).slice(-2)}`,
      ),
      amounts: sorted.map((r) => Number(r.totalAmount)),
    };
  };

  if (loading) {
    return (
      <div className="dashboardPage">
        <div className="pageHeader">
          <h2>Dashboard</h2>
          <div className="subtitle">Overview of your business</div>
        </div>
        <div className="loadingState">Loading...</div>
      </div>
    );
  }

  const revenueThisMonth = getRevenueThisMonth();
  const chartData = getChartData();

  return (
    <div className="dashboardPage">
      <div className="pageHeader">
        <h2>Dashboard</h2>
        <div className="subtitle">Overview of your business</div>
      </div>

      {/* Summary Cards */}
      <div className="summaryStrip">
        <div className="summaryCard revenueCard">
          <div className="cardIcon">
            <TrendingUpIcon sx={{ fontSize: 20 }} />
          </div>
          <div className="cardValue">
            {"\u00A3"}
            {revenueThisMonth.toFixed(2)}
          </div>
          <div className="cardLabel">Revenue This Month</div>
        </div>
        <div className="summaryCard balanceCard">
          <div className="cardIcon">
            <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />
          </div>
          <div className="cardValue">
            {"\u00A3"}
            {(dashboardData?.balanceSummary?.openBalance ?? 0).toFixed(2)}
          </div>
          <div className="cardLabel">Outstanding Balance</div>
        </div>
        <div className="summaryCard overdueCard">
          <div className="cardIcon">
            <ErrorOutlineIcon sx={{ fontSize: 20 }} />
          </div>
          <div className="cardValue">
            {dashboardData?.balanceSummary?.overdueInvoices ?? 0}
          </div>
          <div className="cardLabel">Overdue Invoices</div>
        </div>
        <div className="summaryCard sessionsCard">
          <div className="cardIcon">
            <CalendarMonthIcon sx={{ fontSize: 20 }} />
          </div>
          <div className="cardValue">
            {dashboardData?.sessionsThisMonth ?? 0}
          </div>
          <div className="cardLabel">Sessions This Month</div>
        </div>
      </div>

      {/* Chart + Quick Actions */}
      <div className="dashboardGrid">
        <div className="dashboardCard chartCard">
          <div className="cardTitle">Revenue Trend</div>
          <div className="cardSubtitle">Payments received by month</div>
          {chartData.months.length > 0 ? (
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: chartData.months,
                  tickLabelStyle: {
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                  },
                },
              ]}
              series={[
                {
                  data: chartData.amounts,
                  color: "#0075c5",
                },
              ]}
              height={280}
              margin={{ left: 60, right: 20, top: 20, bottom: 30 }}
              sx={{
                "& .MuiChartsLegend-root": { display: "none" },
              }}
            />
          ) : (
            <div className="emptyChart">No payment data available</div>
          )}
        </div>

        <div className="dashboardCard quickActionsCard">
          <div className="cardTitle">Quick Actions</div>
          <div className="cardSubtitle">Common tasks</div>
          <div className="quickActionsList">
            {QUICK_ACTIONS.map((action) => (
              <div
                key={action.path}
                className="quickActionRow"
                onClick={() => navigate(action.path)}
              >
                <div
                  className="quickActionIcon"
                  style={{
                    background: `${action.color}14`,
                    color: action.color,
                  }}
                >
                  <action.icon sx={{ fontSize: 20 }} />
                </div>
                <span className="quickActionLabel">{action.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="dashboardCard reportsCard">
        <div className="cardTitle">Reports</div>
        <div className="cardSubtitle">
          Generate and download transaction reports
        </div>
        <ExcelReport />
      </div>
    </div>
  );
};

export default DashboardPage;
