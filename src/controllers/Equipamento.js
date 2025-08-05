 import Equipamento from "../models/Equipamento.js";

export async function criarEquipamento(req, res) {
    try {
        const {nome, tag, dataAquisicao, departamentoID} = req.body;
        const equipamento = await Equipamento.create({
            nome,
            tag,
            dataAquisicao: new Date(dataAquisicao),
            departamentoID,
        })
        res.status(200).json({ equipamento });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function listarEquipamentos(req, res) {
    try{
        const equipamentos = await Equipamento.findAll();
        res.json(equipamentos);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar os equipamentos" });
    }
}

export async function detalharEquipamento(req, res) {
    try{
        const {id} = req.params;
        const equipamentos = await Equipamento.findByPk(id);
        if(!equipamentos){
           return res.status(404).json({error: "Equipamento nao encontrado"});
        }
        res.json(equipamentos);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao detalhar os equipamentos" });
    }
}

export async function atualizarEquipamento(req, res) {
    try{
        const {id} = req.params;
        const {nome, tag, dataAquisicao, departamentoID} = req.body;
        const equipamento = await Equipamento.findByPk(id);

        if(!equipamento){
            res.status(404).json({error: "Equipamento nao encontrado"});
        }

        if(nome !== undefined) equipamento.nome = nome;
        if(tag !== undefined) equipamento.tag = tag;
        if(dataAquisicao !== undefined) equipamento.dataAquisicao = new Date(dataAquisicao)

    }
}