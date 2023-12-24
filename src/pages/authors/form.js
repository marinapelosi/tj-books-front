import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import AuthorForm from './components/AuthorForm'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <AuthorForm />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
