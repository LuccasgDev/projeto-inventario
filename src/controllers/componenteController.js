import Componente from "../models/Componente.js";
import {resolveIdentifier} from "../utils/identifierHelper.js";

export async function criarComponente(req, res) {
    try {
        const { tipo, marca, modelo, observacao } = req.body;
        const novoComponente = await Componente.create({
            tipo,
            marca,
            modelo,
            observacao
        });
        res.status(201).json(novoComponente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar componente" });
    }
}

export async function listarComponente(req, res) {
    try {
        const componentes = await Componente.findAll();
        res.status(200).json(componentes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar componentes" });
    }
}

export async function detalharComponente(req, res) {
    try {
        const { id } = req.params;
        const componente = await resolveIdentifier(Componente, id);

        if (!componente) {
            return res.status(404).json({ error: "Componente não encontrado" });
        }

        res.json(componente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao detalhar componente" });
    }
}

export async function atualizarComponente(req, res) {
    try {
        const { id } = req.params;
        const { tipo, marca, modelo, observacao } = req.body;
        const componente = await resolveIdentifier(Componente, id);

        if (!componente) {
            return res.status(404).json({ error: "Componente não encontrado" });
        }

        if (tipo !== undefined) componente.tipo = tipo;
        if (marca !== undefined) componente.marca = marca;
        if (modelo !== undefined) componente.modelo = modelo;
        if (observacao !== undefined) componente.observacao = observacao;

        await componente.save();
        res.json(componente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar componente" });
    }
}

export async function deletarComponente(req, res) {
    try {
        const { id } = req.params;
        const componente = await resolveIdentifier(Componente, id);

        if (!componente) {
            return res.status(404).json({ error: "Componente não encontrado" });
        }

        await componente.destroy();
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar componente" });
    }
}