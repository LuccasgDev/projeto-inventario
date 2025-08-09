import Departamento from '../models/Departamento.js';
import {resolveIdentifier} from "../utils/identifierHelper.js";

export async function listarDepartamentos(req, res) {
    try {
        const departamentos = await Departamento.findAll();
        res.json(departamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar departamentos' });
    }
}

export async function criarDepartamento(req, res) {
    try {
        const { nome, descricao } = req.body;
        const novoDepartamento = await Departamento.create({ nome, descricao });
        res.status(201).json(novoDepartamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar departamento' });
    }
}

export async function detalharDepartamento(req, res) {
    try {
        const { id } = req.params;
        const departamento = await resolveIdentifier(Departamento, id)

        if (!departamento) {
            return res.status(404).json({ error: 'Departamento não encontrado' });
        }

        res.json(departamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao detalhar departamento' });
    }
}

export async function atualizarDepartamento(req, res) {
    try {
        const { id } = req.params;
        const { nome, descricao } = req.body;

        const departamento = await resolveIdentifier(Departamento, id)
        if (!departamento) {
            return res.status(404).json({ error: 'Departamento não encontrado' });
        }

        departamento.nome = nome;
        departamento.descricao = descricao;
        await departamento.save();

        res.json(departamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar departamento' });
    }
}

export async function deletarDepartamento(req, res) {
    try {
        const { id } = req.params;
        const departamento = await resolveIdentifier(Departamento, id)

        if (!departamento) {
            return res.status(404).json({ error: 'Departamento não encontrado' });
        }

        await departamento.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar departamento' });
    }
}