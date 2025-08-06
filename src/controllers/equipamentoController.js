 import EquipamentoModels from "../models/equipamentoModels.js";

export async function criarEquipamento(req, res) {
    try {
        const {nome, tag, dataAquisicao} = req.body;
        const equipamento = await EquipamentoModels.create({
            nome,
            tag,
            dataAquisicao: new Date(dataAquisicao)
        })
        res.status(200).json({ equipamento });
    }catch (error) {
        res.status(500).json({ error: "erro ao criar equipamento" });
    }
}

export async function listarEquipamentos(req, res) {
    try{
        const equipamentos = await EquipamentoModels.findAll();
        res.json(equipamentos);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar os equipamentos" });
    }
}

export async function detalharEquipamento(req, res) {
    try{
        const {id} = req.params;
        const equipamentos = await EquipamentoModels.findByPk(id);
        if(!equipamentos){
           return res.status(404).json({error: "EquipamentoModels nao encontrado"});
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
        const {nome, tag, dataAquisicao} = req.body;
        const equipamento = await EquipamentoModels.findByPk(id);

        if(!equipamento){
            res.status(404).json({error: "EquipamentoModels nao encontrado"});
        }

        if(nome !== undefined) equipamento.nome = nome;
        if(tag !== undefined) equipamento.tag = tag;
        if(dataAquisicao !== undefined) equipamento.dataAquisicao = new Date(dataAquisicao)
        if(departamentoID !== undefined) equipamento.departamentoID = departamentoID;

        await equipamento.save();

        res.status(200).json({message: 'EquipamentoModels atualizado'});
    }catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro ao atualizar os equipamentos"});
    }
}


export async function deletarEquipamento(req, res) {
    try{
        const {id} = req.params;
        const equipamento = await EquipamentoModels.findByPk(id);
        if(!equipamento){
            res.status(404).json({error: "EquipamentoModels nao encontrado"});
        }
        await equipamento.destroy();
        res.status(200).send()
    }catch (error){
        console.error(error);
        res.status(500).json({error: "Erro ao deletar equipamento"});
    }
}