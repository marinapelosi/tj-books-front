import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DashboardCounters from 'src/views/dashboard/DashboardCounters'
import DashboardTopFivesAuthors from 'src/views/dashboard/DashboardTopFivesAuthors'
import DashboardTopFivesSubjects from "../views/dashboard/DashboardTopFivesSubjects";
import DashboardLastBooks from "../views/dashboard/DashboardLastBooks";

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <DashboardCounters />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardTopFivesAuthors />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <DashboardTopFivesSubjects />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <DashboardLastBooks />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
