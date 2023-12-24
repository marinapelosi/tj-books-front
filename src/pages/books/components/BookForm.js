import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import TrashCan from 'mdi-material-ui/TrashCan';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { BookOutline, BookAlphabet, Numeric1BoxOutline } from 'mdi-material-ui';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';

const BookForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [edition, setEdition] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [price, setPrice] = useState('');
  const [authors, setAuthors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/api/books';
  const apiUrlAuthors = process.env.NEXT_PUBLIC_API_URL + '/api/authors';
  const apiUrlSubjects = process.env.NEXT_PUBLIC_API_URL + '/api/subjects';
  const [authorList, setAuthorList] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const fetchData = async () => {
    try {
      if (id) {
        const response = await axios.get(`${apiUrl}/${id}`);
        const data = response.data.data;

        setTitle(data.title);
        setPublisher(data.publisher);
        setEdition(data.edition);
        setPublicationYear(data.publicationYear);
        setPrice(data.price);
        setSelectedAuthors(data.authors.map((author) => author.id));
        setSelectedSubjects(data.subjects.map((subject) => subject.id));
      }
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      toast.error('Erro ao buscar livro');
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, apiUrl]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(apiUrlAuthors);
        setAuthorList(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar autores:', error);
      }
    };

    fetchAuthors();
  }, [apiUrlAuthors]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(apiUrlSubjects);
        setSubjectList(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar assuntos:', error);
      }
    };

    fetchSubjects();
  }, [apiUrlSubjects]);

  const handleAuthorChange = (event) => {
    const selectedAuthorIds = event.target.value;
    setSelectedAuthors(selectedAuthorIds);
  };

  const handleSubjectChange = (event) => {
    const selectedSubjectIds = event.target.value;
    setSelectedSubjects(selectedSubjectIds);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = id
        ? await axios.put(`${apiUrl}/${id}`, { title, publisher, edition, publicationYear, price, authors: selectedAuthors, subjects: selectedSubjects })
        : await axios.post(apiUrl, { title, publisher, edition, publicationYear, price, authors: selectedAuthors, subjects: selectedSubjects });

      toast.success(id ? 'Livro atualizado com sucesso' : 'Livro cadastrado com sucesso');
      router.push('/books');
    } catch (error) {
      const errorMessages = getErrorMessages(error);

      errorMessages.forEach((errorMessage, index) => {
        toast.error(errorMessage, { key: `${index}-${errorMessage}` });
      });
    }
  };

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Confirmar Exclusão',
        text: `Deseja realmente excluir ${title}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4f76d9',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
      });

      if (result.isConfirmed) {
        await axios.delete(`${apiUrl}/${id}`);
        toast.success('Livro excluído com sucesso');
        router.push('/books');
      }
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      toast.error(error.response?.data?.message || 'Erro ao excluir livro');
    }
  };

  const getErrorMessages = (error) => {
    if (error.response && error.response.data && error.response.data.errors) {
      const { errors } = error.response.data;
      return typeof errors === 'object' ? Object.values(errors).flat() : [];
    }

    return ['Erro ao cadastrar livro'];
  };

  return (
    <Card>
      <CardHeader title={id ? 'Editar Livro' : 'Cadastrar Livro'} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label='Título do Livro'
                placeholder='Informe o título aqui'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <BookOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label='Editora'
                placeholder='Nome da editora'
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <BookAlphabet />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label='Edição'
                placeholder=''
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Numeric1BoxOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label='Preço'
                placeholder=''
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      R$
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <label style={{ fontSize: 11 }}>Ano de Publicação:</label>
              <Select
                fullWidth
                value={publicationYear}
                onChange={(e) => setPublicationYear(e.target.value)}
              >
                {Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <label style={{ fontSize: 11 }}>Selecionar Autores</label>
              <FormControl fullWidth>
                <Select
                  labelId="authors-label"
                  multiple
                  value={selectedAuthors}
                  onChange={handleAuthorChange}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((authorId) => (
                        <Chip
                          key={authorId}
                          label={authorList.find((author) => author.id === authorId)?.name || 'Autor não encontrado'}
                          style={{ marginRight: 5 }}
                        />
                      ))}
                    </div>
                  )}
                >
                  {authorList && authorList.map((author) => (
                    <MenuItem key={author.id} value={author.id}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <label style={{ fontSize: 11 }}>Selecionar Assuntos</label>
              <FormControl fullWidth>
                <Select
                  labelId="subjects-label"
                  multiple
                  value={selectedSubjects}
                  onChange={handleSubjectChange}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((subjectId) => (
                        <Chip
                          key={subjectId}
                          label={subjectList.find((subject) => subject.id === subjectId)?.description || 'Assunto não encontrado'}
                          style={{ marginRight: 5 }}
                        />
                      ))}
                    </div>
                  )}
                >
                  {subjectList && subjectList.map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  onClick={() => router.push('/books')}
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

export default BookForm;
