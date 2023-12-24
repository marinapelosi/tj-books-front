import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  Avatar,
  Typography,
  IconButton,
  CardHeader,
  CardContent
} from '@mui/material';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import {BookOutline} from "mdi-material-ui";

const DashboardTopFive = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/api/reports/dashboard-lastbooks';
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader
        title='Últimos Livros Cadastrados'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            {/*<DotsVertical />*/}
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {data && data.map((item, index) => (
          <Box
            key={item.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              ...(index !== data.length - 1 ? { mb: 5.875 } : {})
            }}
          >
            <Avatar
              sx={{
                width: 38,
                height: 38,
                marginRight: 3,
                fontSize: '1rem',
                color: 'common.white',
                backgroundColor: `primary.main`
              }}
            >
              <BookOutline />
            </Avatar>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                  {item.title}
                </Typography>
                <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                  {item.publisher} - Edição: {item.edition}/{item.publicationYear}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.72, letterSpacing: '0.22px' }}>
                  {item.price}
                </Typography>
                <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                  reais
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default DashboardTopFive;
