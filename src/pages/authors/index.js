import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from "@mui/material/Button"
import AuthorsList from './components/AuthorsList'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Autores' titleTypographyProps={{ variant: 'h6' }} />
          <Grid align="right" xs={12} style={{marginLeft: '-20px'}} >
            <Button type='button' variant='contained' size='large' href="/authors/form">
              + Cadastrar Novo
            </Button>
          </Grid>
          <AuthorsList/>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
