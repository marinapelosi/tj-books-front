import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';
import * as XLSX from 'xlsx';

const ReportBookGroupByAuthorsDetails = ({ reportRoute }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [reportData, setReportData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + reportRoute);
        setReportData(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar dados do relatório:', error);
      }
    };

    fetchData();
  }, [reportRoute]);

  const exportToPdf = () => {
    if (!tableRef.current) return;

    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const formattedDate = moment().format('DD/MM/YYYY [às] HH:mm');

      const title = `Relatório de livros agrupados por autores (${formattedDate})`;
      pdf.text(title, 105, 15, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 0, 20, imgWidth, imgHeight);

      const fileName = `${moment().format('YYYYMMDDHis')}-relatorio-livros-agrupados-por-autores`;
      pdf.save(`${fileName}.pdf`);
    });
  };

  const exportToExcel = () => {
    const fileName = `${moment().format('YYYYMMDDHis')}-relatorio-livros-agrupados-por-autores.xlsx`;

    const columnHeaderMap = {
      authors: 'Autores',
      book: 'Livro',
      publisher: 'Editora',
      edition: 'Edição',
      publicationyear: 'Ano',
      subjects: 'Assuntos',
      price: 'Valor'
    };

    const wsData = reportData.map((row) => {
      const newRow = {};
      for (const key in columnHeaderMap) {
        newRow[columnHeaderMap[key]] = row[key];
      }
      return newRow;
    });

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatorio');

    XLSX.writeFile(wb, fileName);
  };

  const Row = ({ row }) => {
    return (
      <TableRow>
        <TableCell align="left">{row.authors}</TableCell>
        <TableCell>{row.book}</TableCell>
        <TableCell>{row.publisher}</TableCell>
        <TableCell align="center">{row.edition}/{row.publicationyear}</TableCell>
        <TableCell>{row.subjects}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" ref={tableRef}>
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
      <Grid container style={{ padding: 20 }}>
        <Grid item align="right">
          <Button variant="contained" size="large" onClick={exportToPdf}>
            Exportar para PDF
          </Button>
          <Button variant="contained" size="large" onClick={exportToExcel} style={{ marginLeft: 10 }}>
            Exportar para Excel
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportBookGroupByAuthorsDetails;
