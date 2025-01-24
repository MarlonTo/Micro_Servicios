import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Usuarios from './pages/Usuarios';
import Cursos from './pages/Cursos';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/" element={<Usuarios />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 