const express = require('express');
const router = express.Router();

// Array para simular um banco de dados de alunos
let alunos = [
    { id: 1, nome: 'Maria Silva', email: 'maria.silva@example.com', cpf: '111.111.111-11', telefone: '9999-8888', dataNascimento: '2000-01-15' },
    { id: 2, nome: 'João Santos', email: 'joao.santos@example.com', cpf: '222.222.222-22', telefone: '7777-6666', dataNascimento: '1999-05-20' }
];
let nextAlunoId = 3;

// GET todos os alunos
router.get('/', (req, res) => {
    res.json(alunos);
});

// GET aluno por ID
router.get('/:id', (req, res) => {
    const aluno = alunos.find(a => a.id === parseInt(req.params.id));
    if (!aluno) return res.status(404).send('Aluno não encontrado.');
    res.json(aluno);
});

// POST novo aluno
router.post('/', (req, res) => {
    const { nome, email, cpf, telefone, dataNascimento } = req.body;
    if (!nome || !email || !cpf) {
        return res.status(400).send('Nome, email e CPF são campos obrigatórios.');
    }
    if (alunos.some(a => a.cpf === cpf)) {
        return res.status(400).send('CPF já cadastrado.');
    }
    const newAluno = { id: nextAlunoId++, nome, email, cpf, telefone, dataNascimento };
    alunos.push(newAluno);
    res.status(201).json(newAluno);
});

// PUT atualizar aluno por ID
router.put('/:id', (req, res) => {
    const aluno = alunos.find(a => a.id === parseInt(req.params.id));
    if (!aluno) return res.status(404).send('Aluno não encontrado.');

    const { nome, email, cpf, telefone, dataNascimento } = req.body;
    if (!nome || !email || !cpf) {
        return res.status(400).send('Nome, email e CPF são campos obrigatórios.');
    }
    if (alunos.some(a => a.cpf === cpf && a.id !== aluno.id)) {
        return res.status(400).send('CPF já cadastrado por outro aluno.');
    }

    aluno.nome = nome;
    aluno.email = email;
    aluno.cpf = cpf;
    aluno.telefone = telefone;
    aluno.dataNascimento = dataNascimento;
    res.json(aluno);
});

// DELETE aluno por ID
router.delete('/:id', (req, res) => {
    const initialLength = alunos.length;
    alunos = alunos.filter(a => a.id !== parseInt(req.params.id));
    if (alunos.length === initialLength) return res.status(404).send('Aluno não encontrado.');
    res.status(204).send(); // No Content
});

module.exports = router;