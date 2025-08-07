import Componente from "../models/Componente.js";

export async function criarComponente(req, res) {
    try {
        const { tipo, marca, modelo, observacao } = req.body;
        const novoComponente = await Componente.create({ tipo, marca, modelo, observacao });
        res.status(201).json(novoComponente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar o Componente" });
    }
}

export async function listarComponente(req, res) {
    try {
        const componentes = await Componente.findAll();
        res.json(componentes); // Corrigido: json em vez de join
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar Componente" });
    }
}

export async function detalharComponente(req, res) {
    try {
        const { id } = req.params;
        const componente = await Componente.findByPk(id); // Nome corrigido
        if (!componente) {
            return res.status(404).json({ error: "Componente não encontrado" });
        }
        res.json(componente); // Resposta adicionada
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao detalhar Componente" });
    }
}

export async function atualizarComponente(req, res) {
    try {
        const { id } = req.params;
        const { tipo, marca, modelo, observacao } = req.body;
        const componente = await Componente.findByPk(id); // Nome corrigido

        if (!componente) {
            return res.status(404).json({ error: "Componente não encontrado" });
        }

        // Atualiza apenas os campos fornecidos
        if (tipo !== undefined) componente.tipo = tipo;
        if (marca !== undefined) componente.marca = marca;
        if (modelo !== undefined) componente.modelo = modelo;
        if (observacao !== undefined) componente.observacao = observacao;

        await componente.save();
        res.json(componente); // Retorna o componente atualizado
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar Componente" });
    }
}

export async function deletarComponente(req, res) {
    try {
        const { id } = req.params;
        const componente = await Componente.findByPk(id); // "C" maiúsculo

        if (!componente) {
            return res.status(404).json({ error: "Componente não encontrado" });
        }

        await componente.destroy();
        res.sendStatus(204); // Corrigido: sendStatus em vez de sed
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar componente" });
    }
}