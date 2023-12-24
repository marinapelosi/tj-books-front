import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import SubjectForm from './components/SubjectForm'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <SubjectForm />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
