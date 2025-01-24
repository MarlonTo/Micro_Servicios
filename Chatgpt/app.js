const express = require('express');
const axios = require('axios');
const app = express();

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// URLs base de las APIs
const API_USUARIOS = 'http://192.168.175.130:8004/api/usuarios';
const API_CURSOS = 'http://192.168.175.130:8002/api/cursos';

// Rutas principales
app.get('/', async (req, res) => {
    try {
        const [usuariosResponse, cursosResponse] = await Promise.all([
            axios.get(API_USUARIOS),
            axios.get(API_CURSOS)
        ]);

        const usuarios = usuariosResponse.data;
        const cursos = cursosResponse.data;
        res.render('index', { usuarios, cursos });
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
        res.status(500).send('Error al obtener datos.');
    }
});

// CRUD Usuarios
app.post('/usuarios', async (req, res) => {
    try {
        const usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            telefono: req.body.telefono,
            fechaNacimiento: req.body.fechaNacimiento
        };
        await axios.post(API_USUARIOS, usuario);
        res.redirect('/');
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        res.status(500).send('Error al crear usuario');
    }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            telefono: req.body.telefono,
            fechaNacimiento: req.body.fechaNacimiento
        };
        await axios.put(`${API_USUARIOS}/${req.params.id}`, usuario);
        res.json({ success: true });
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        res.status(500).json({ success: false });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        await axios.delete(`${API_USUARIOS}/${req.params.id}`);
        res.json({ success: true });
    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
        res.status(500).json({ success: false });
    }
});

// CRUD Cursos
app.post('/cursos', async (req, res) => {
    try {
        const curso = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            creditos: parseInt(req.body.creditos)
        };
        await axios.post(API_CURSOS, curso);
        res.redirect('/');
    } catch (error) {
        console.error('Error al crear curso:', error.message);
        res.status(500).send('Error al crear curso');
    }
});

app.put('/cursos/:id', async (req, res) => {
    try {
        const curso = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            creditos: parseInt(req.body.creditos)
        };
        await axios.put(`${API_CURSOS}/${req.params.id}`, curso);
        res.json({ success: true });
    } catch (error) {
        console.error('Error al actualizar curso:', error.message);
        res.status(500).json({ success: false });
    }
});

app.delete('/cursos/:id', async (req, res) => {
    try {
        await axios.delete(`${API_CURSOS}/${req.params.id}`);
        res.json({ success: true });
    } catch (error) {
        console.error('Error al eliminar curso:', error.message);
        res.status(500).json({ success: false });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
