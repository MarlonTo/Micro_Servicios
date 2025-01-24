import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Box,
  Chip
} from '@mui/material';
import axios from 'axios';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://192.168.175.130:8002/api/cursos');
        setCursos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los cursos');
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Catálogo de Cursos
      </Typography>
      <Grid container spacing={3}>
        {cursos.map((curso) => (
          <Grid item xs={12} sm={6} md={4} key={curso.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {curso.nombre}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Profesor: {curso.profesor}
                </Typography>
                <Typography variant="body2" paragraph>
                  {curso.descripcion}
                </Typography>
                <Chip 
                  label={`${curso.estudiantes ? curso.estudiantes.length : 0} estudiantes`}
                  color="primary"
                  size="small"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cursos; 