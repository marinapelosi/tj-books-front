import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TrendingUp from 'mdi-material-ui/TrendingUp';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import CellphoneLink from 'mdi-material-ui/CellphoneLink';
import AccountOutline from 'mdi-material-ui/AccountOutline';
import Books from "../../pages/books";
import {Account, BookOutline, CurrencyBrl, TagOutline} from "mdi-material-ui";

const DashboardCounters = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/api/reports/dashboard-counters';
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setCounters(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const salesData = [
    {
      stats: counters.books || '0',
      title: 'Livros',
      color: 'primary',
      icon: <BookOutline sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: counters.authors || '0',
      title: 'Autores',
      color: 'success',
      icon: <Account sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: counters.subjects || '0',
      color: 'warning',
      title: 'Assuntos',
      icon: <TagOutline sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: counters.sum_books_prices || '0,00',
      color: 'info',
      title: 'Montante total dos livros',
      icon: <CurrencyBrl sx={{ fontSize: '1.75rem' }} />,
    },
  ];

  return (
    <Card>
      <CardHeader
        title='Veja o que temos até hoje!'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            {/*<DotsVertical />*/}
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Cálculo total de Autores, Assuntos, Livros e Valor acumulado em livros.
            </Box>
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {salesData.map((item, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  variant='rounded'
                  sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    boxShadow: 3,
                    color: 'common.white',
                    backgroundColor: `${item.color}.main`,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='caption'>{item.title}</Typography>
                  <Typography variant='h6'>{item.stats}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DashboardCounters;
