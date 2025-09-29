const express = require('express');
const router = express.Router();

// Array para simular um banco de dados de professores
let professores = [
    { id: 1, nome: 'Carlos Souza', email: 'carlos.souza@example.com', cpf: '333.333.333-33', curso: 'Matemática', disciplina: 'Cálculo I' },
    { id: 2, nome: 'Ana Costa', email: 'ana.costa@example.com', cpf: '444.444.444-44', curso: 'Física', disciplina: 'Mecânica Clássica' }
];
let nextProfessorId = 3;

// GET todos os professores
router.get('/', (req, res) => {
    res.json(professores);
});

// GET professor por ID
router.get('/:id', (req, res) => {
    const professor = professores.find(p => p.id === parseInt(req.params.id));
    if (!professor) return res.status(404).send('Professor não encontrado.');
    res.json(professor);
});

// POST novo professor
router.post('/', (req, res) => {
    const { nome, email, cpf, curso, disciplina } = req.body;
    if (!nome || !email || !cpf || !curso || !disciplina) {
        return res.status(400).send('Nome, email, CPF, curso e disciplina são campos obrigatórios.');
    }
    if (professores.some(p => p.cpf === cpf)) {
        return res.status(400).send('CPF já cadastrado.');
    }
    const newProfessor = { id: nextProfessorId++, nome, email, cpf, curso, disciplina };
    professores.push(newProfessor);
    res.status(201).json(newProfessor);
});

// PUT atualizar professor por ID
router.put('/:id', (req, res) => {
    const professor = professores.find(p => p.id === parseInt(req.params.id));
    if (!professor) return res.status(404).send('Professor não encontrado.');

    const { nome, email, cpf, curso, disciplina } = req.body;
    if (!nome || !email || !cpf || !curso || !disciplina) {
        return res.status(400).send('Nome, email, CPF, curso e disciplina são campos obrigatórios.');
    }
    if (professores.some(p => p.cpf === cpf && p.id !== professor.id)) {
        return res.status(400).send('CPF já cadastrado por outro professor.');
    }

    professor.nome = nome;
    professor.email = email;
    professor.cpf = cpf;
    professor.curso = curso;
    professor.disciplina = disciplina;
    res.json(professor);
});

// DELETE professor por ID
router.delete('/:id', (req, res) => {
    const initialLength = professores.length;
    professores = professores.filter(p => p.id !== parseInt(req.params.id));
    if (professores.length === initialLength) return res.status(404).send('Professor não encontrado.');
    res.status(204).send(); // No Content
});

module.exports = router;