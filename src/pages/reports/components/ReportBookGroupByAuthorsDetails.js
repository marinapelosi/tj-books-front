import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
const ReportBookGroupByAuthorsDetails = ({ reportRoute }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl+reportRoute);
        setReportData(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar dados do relatório:', error);
      }
    };

    fetchData();
  }, [reportRoute]);

  const Row = ({ row }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow>
          <TableCell align="left">{row.authors}</TableCell>
          <TableCell>{row.book}</TableCell>
          <TableCell>{row.publisher}</TableCell>
          <TableCell align="center">{row.edition}/{row.publicationyear}</TableCell>
          <TableCell>{row.subjects}</TableCell>
          <TableCell align="right">{row.price}</TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Autores</TableCell>
            <TableCell>Livro</TableCell>
            <TableCell>Editora</TableCell>
            <TableCell>Edição/Ano</TableCell>
            <TableCell>Assuntos</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportBookGroupByAuthorsDetails;
