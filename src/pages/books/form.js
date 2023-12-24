import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import BookForm from './components/BookForm'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <BookForm />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
