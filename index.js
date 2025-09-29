const express = require('express');
const cors = require('cors');
const alunosRoutes = require('./routes/alunos'); // Importa as rotas de alunos
const professoresRoutes = require('./routes/professores'); // Importa as rotas de professores

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Habilita o uso de JSON no corpo das requisições

// Mapeia as rotas
app.use('/alunos', alunosRoutes);
app.use('/professores', professoresRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});