import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import AccountOutline from 'mdi-material-ui/AccountOutline';
import TrashCan from 'mdi-material-ui/TrashCan';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AuthorForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/api/authors';

  const fetchData = async () => {
    try {
      if (id) {
        const response = await axios.get(`${apiUrl}/${id}`);
        setName(response.data.data.name);
      }
      setDataLoaded(true);
    } catch (error) {
      console.error('Erro ao buscar autor:', error);
      toast.error('Erro ao buscar autor');
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, apiUrl]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = id
        ? await axios.put(`${apiUrl}/${id}`, { name })
        : await axios.post(apiUrl, { name });

      toast.success(id ? 'Autor atualizado com sucesso' : 'Autor cadastrado com sucesso');
      router.push('/authors');
    } catch (error) {
      const errorMessages = getErrorMessages(error);

      errorMessages.forEach((errorMessage, index) => {
        toast.error(errorMessage, { key: `${index}-${errorMessage}` });
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Confirmar Exclusão',
      text: `Deseja realmente excluir ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f76d9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${apiUrl}/${id}`);
          toast.success('Autor excluído com sucesso');
          router.push('/authors');
        } catch (error) {
          console.error('Erro ao excluir autor:', error);
          toast.error(error.response.data.message);
        }
      }
    });
  };

  const getErrorMessages = (error) => {
    if (error.response && error.response.data && error.response.data.errors) {
      const { errors } = error.response.data;
      return typeof errors === 'object' ? Object.values(errors).flat() : [];
    }

    return ['Erro ao cadastrar autor'];
  };

  return (
    <Card>
      <CardHeader title={id ? 'Editar Autor' : 'Cadastrar Autor'} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Nome do Autor'
                placeholder='Nome do Autor'
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end">
                <Button type='submit' variant='contained' size='large'>
                  {(id) ? 'Atualizar' : 'Salvar'}
                </Button>
                <Button
                  type='button'
                  variant='outlined'
                  size='large'
                  onClick={() => router.push('/authors')}
                  sx={{ marginLeft: 2 }}
                >
                  Cancelar
                </Button>
                {id && (
                  <Button
                    type='button'
                    variant='outlined'
                    size='large'
                    startIcon={<TrashCan />}
                    onClick={handleDelete}
                    sx={{ marginLeft: 2, color: '#d9534f' }}
                  >
                    Excluir
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthorForm;
