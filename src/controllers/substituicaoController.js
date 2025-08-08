import Substituicao from "../models/Substituicao.js";

export async function criarSubstituicao(req, res) {
    try {
        const {
            equipamentoId,
            componenteAntigoId,
            componenteNovoId,
            dataSubstituicao,
            observacao
        } = req.body;

        const substituicao = await Substituicao.create({
            equipamentoId,
            componenteAntigoId,
            componenteNovoId,
            dataSubstituicao: new Date(dataSubstituicao),
            observacao
        });

        res.status(201).json(substituicao);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar substituição" });
    }
}

export async function listarSubstituicao(req, res) {
    try {
        const substituicoes = await Substituicao.findAll();
        res.status(200).json(substituicoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar substituições" });
    }
}

export async function detalhesSubstituicao(req, res) {
    try {
        const { id } = req.params;
        const substituicao = await Substituicao.findByPk(id);

        if (!substituicao) {
            return res.status(404).json({ error: "Substituição não encontrada" });
        }

        res.json(substituicao);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao detalhar substituição" });
    }
}

export async function atualizarSubstituicao(req, res) {
    try {
        const { id } = req.params;
        const { dataSubstituicao, observacao } = req.body;
        const substituicao = await Substituicao.findByPk(id);

        if (!substituicao) {
            return res.status(404).json({ error: "Substituição não encontrada" });
        }

        if (dataSubstituicao !== undefined) substituicao.dataSubstituicao = new Date(dataSubstituicao);
        if (observacao !== undefined) substituicao.observacao = observacao;

        await substituicao.save();
        res.json(substituicao);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar substituição" });
    }
}

export async function deletarSubstituicao(req, res) {
    try {
        const { id } = req.params;
        const substituicao = await Substituicao.findByPk(id);

        if (!substituicao) {
            return res.status(404).json({ error: "Substituição não encontrada" });
        }

        await substituicao.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar substituição" });
    }
}