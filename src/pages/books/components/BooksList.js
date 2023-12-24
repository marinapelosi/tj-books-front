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
import Chip from "@mui/material/Chip";

const Row = props => {
  const { row } = props
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell width={1}>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {
              row.authors_quantity > 0 ?
                open ? <ChevronUp /> : <ChevronDown />
              : ''
            }
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>{row.title}</TableCell>
        <TableCell>{row.publisher}</TableCell>
        <TableCell align='right'>{row.edition}/{row.publicationYear}</TableCell>
        <TableCell align='center'>{row.authors_quantity}</TableCell>
        <TableCell align='center'>{row.subjects_quantity}</TableCell>
        <TableCell align='right'>{row.created_at}</TableCell>
        <TableCell align='right'>{row.price}</TableCell>
        <TableCell align='right'>
          <Button type='button' variant='outlined' size='small' href={`/books/form?id=${row.id}`} id={row.id}>
            Gerenciar
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Detalhes do Livro
              </Typography>
              {row.subjects && row.subjects.map(subjects => (
                <Chip
                  key={subjects.id}
                  label={subjects.description}
                  sx={{
                    backgroundColor: 'gray',
                    height: 24,
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                    '& .MuiChip-label': { fontWeight: 500, color: 'white' },
                    marginLeft: 1
                  }}
                />
              ))}
              <br />
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Autores</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.authors && row.authors.map(author => (
                    <TableRow key={author.id}>
                      <TableCell component='th' scope='row'>{author.name}</TableCell>
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

const BooksList = () => {
  const [rows, setRows] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL+'/api/books';

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
            <TableCell>Livro</TableCell>
            <TableCell>Editora</TableCell>
            <TableCell>Edição/Ano</TableCell>
            <TableCell align='right'>Autores</TableCell>
            <TableCell align='right'>Assuntos</TableCell>
            <TableCell align='right'>Cadastrado em</TableCell>
            <TableCell align='right'>Valor (R$)</TableCell>
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

export default BooksList
