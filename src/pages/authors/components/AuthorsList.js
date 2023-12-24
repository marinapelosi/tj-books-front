import { useState, Fragment, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Button from "@mui/material/Button"

const Row = props => {
  const { row } = props
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell width={1}>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {
              row.books_quantity > 0 ?
                open ? <ChevronUp /> : <ChevronDown />
              : ''
            }
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>{row.books_quantity}</TableCell>
        <TableCell align='right'>
          <Button type='button' variant='outlined' size='small' href={`/authors/form?id=${row.id}`} id={row.id}>
            Gerenciar
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Livros do autor
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Livro</TableCell>
                    <TableCell>Editora</TableCell>
                    <TableCell align='right'>Edição/Ano</TableCell>
                    <TableCell align='right'>Cadastrado em</TableCell>
                    <TableCell align='right'>Valor (R$)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.books.map(book => (
                    <TableRow key={book.id}>
                      <TableCell component='th' scope='row'>
                        {book.title}
                      </TableCell>
                      <TableCell>{book.publisher}</TableCell>
                      <TableCell align='right'>{book.edition}/{book.year_publication}</TableCell>
                      <TableCell align='right'>{book.created_at}</TableCell>
                      <TableCell align='right'>{book.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const AuthorsList = () => {
  const [rows, setRows] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL+'/api/authors';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setRows(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell align='right'>Livros</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AuthorsList
