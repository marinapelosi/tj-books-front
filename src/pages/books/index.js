import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from "@mui/material/Button"
import BooksList from './components/BooksList'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Livros' titleTypographyProps={{ variant: 'h6' }} />
          <Grid align="right" xs={12} style={{marginLeft: '-20px'}} >
            <Button type='button' variant='contained' size='large' href="/books/form">
              + Cadastrar Novo
            </Button>
          </Grid>
          <BooksList/>
        </Card>
      </Grid>
    </Grid>
  )
}
export default MUITable
