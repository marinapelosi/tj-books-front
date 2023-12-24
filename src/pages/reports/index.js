// MUITable.js
import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ReportBookGroupByAuthorsDetails from "./components/ReportBookGroupByAuthorsDetails";

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Relatório de livros agrupados por autores' titleTypographyProps={{ variant: 'h6' }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ReportBookGroupByAuthorsDetails reportRoute="/api/reports/book-by-author-grouping-authors" />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MUITable;
