import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ExcelReport from "../../components/excelReport/ExcelReport";

const DashboardPage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={8} lg={6}>
          <div className="listContainer">
            <div className="listHeader">
              <div className="listTitle">Reports</div>
            </div>
            <ExcelReport />
          </div>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <div className="listContainer">
            <div className="listHeader">
              <div className="listTitle">Sales</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="listContainer">
            <div className="listHeader">
              <div className="listTitle">Score History</div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
