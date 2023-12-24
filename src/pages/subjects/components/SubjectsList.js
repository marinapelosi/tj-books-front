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
        <TableCell component='th' scope='row'>
          {row.description}
        </TableCell>
        <TableCell align='right'>{row.books_quantity}</TableCell>
        <TableCell align='right'>
          <Button type='button' variant='outlined' size='small' href={`/subjects/form?id=${row.id}`} id={row.id}>
            Gerenciar
          </Button>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const SubjectsList = () => {
  const [rows, setRows] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL+'/api/subjects';

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
            <TableCell>Descrição</TableCell>
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

export default SubjectsList
