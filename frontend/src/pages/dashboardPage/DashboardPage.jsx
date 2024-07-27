import Grid from "@mui/material/Grid";
import ExcelReport from "../../components/excelReport/ExcelReport";
import { LineChart } from "@mui/x-charts";

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
        {/* <Grid item xs={12} md={8} lg={6}>
          <div className="listContainer">
            <div className="listHeader">
              <div className="listTitle">Sales</div>
            </div>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            />
          </div>
        </Grid> */}
        {/* <Grid item xs={12}>
          <div className="listContainer">
            <div className="listHeader">
              <div className="listTitle"></div>
            </div>
          </div>
        </Grid> */}
      </Grid>
    </>
  );
};

export default DashboardPage;
