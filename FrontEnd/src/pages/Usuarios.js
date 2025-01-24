import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Box
} from '@mui/material';
import axios from 'axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://192.168.175.130:8004/api/usuarios');
        setUsuarios(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los usuarios');
        setLoading(false);
      }
    };

    fetchUsuarios();
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
        Lista de Usuarios
      </Typography>
      <Grid container spacing={3}>
        {usuarios.map((usuario) => (
          <Grid item xs={12} sm={6} md={4} key={usuario.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {usuario.nombre}
                </Typography>
                <Typography color="textSecondary">
                  Email: {usuario.email}
                </Typography>
                {usuario.cursos && (
                  <Typography variant="body2">
                    Cursos inscritos: {usuario.cursos.length}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Usuarios; 