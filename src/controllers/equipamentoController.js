import Equipamento from "../models/Equipamento.js";

export async function criarEquipamento(req, res) {
    try {
        const { nome, tag, dataAquisicao, departamentoId } = req.body;
        const equipamento = await Equipamento.create({
            nome,
            tag,
            dataAquisicao: new Date(dataAquisicao),
            departamentoId
        });
        res.status(201).json(equipamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar equipamento" });
    }
}

export async function listarEquipamentos(req, res) {
    try {
        const equipamentos = await Equipamento.findAll();
        res.json(equipamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar equipamentos" });
    }
}

export async function detalharEquipamento(req, res) {
    try {
        const { id } = req.params;
        const equipamento = await Equipamento.findByPk(id);

        if (!equipamento) {
            return res.status(404).json({ error: "Equipamento não encontrado" });
        }

        res.json(equipamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao detalhar equipamento" });
    }
}

export async function atualizarEquipamento(req, res) {
    try {
        const { id } = req.params;
        const { nome, tag, dataAquisicao, departamentoId } = req.body;
        const equipamento = await Equipamento.findByPk(id);

        if (!equipamento) {
            return res.status(404).json({ error: "Equipamento não encontrado" });
        }

        if (nome !== undefined) equipamento.nome = nome;
        if (tag !== undefined) equipamento.tag = tag;
        if (dataAquisicao !== undefined) equipamento.dataAquisicao = new Date(dataAquisicao);
        if (departamentoId !== undefined) equipamento.departamentoId = departamentoId;

        await equipamento.save();
        res.json(equipamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar equipamento" });
    }
}

export async function deletarEquipamento(req, res) {
    try {
        const { id } = req.params;
        const equipamento = await Equipamento.findByPk(id);

        if (!equipamento) {
            return res.status(404).json({ error: "Equipamento não encontrado" });
        }

        await equipamento.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar equipamento" });
    }
}