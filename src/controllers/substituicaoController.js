import substituicaoModels from "../models/substituicaoModels.js";

export async function criarSubstituicao(req, res){
    try {
        const {dataSubstituicao, obsevacao} = req.body;
        const substituicao = await substituicaoModels.create({dataSubstituicao, obsevacao})
        res.status(200).json({substituicao});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "erro ao criar substituicao" });
    }
}

export async function listarSubstituicao(req, res){
    try {
        const substituicao = await substituicaoModels.findAll()
        res.status(200).json({substituicao});
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar os equipamentos" });
    }
}

export async function detalhesSubstituicao(req, res){
    try {
        const {id} = req.params;
        const subestituicao = await substituicaoModels.findByPk(id);
        if(!subestituicao){
            res.status(404).json({error: "Nao encontrado"});
        }
        res.json({subestituicao});
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar os substituicao" });
    }
}

export async function atualizarSubstituicao(req, res){
    try {
        const {id} = req.params;
        const{dataSubstituicao, obsevacao} = res.body
        const substituicao = await substituicaoModels.findByPk(id);
        if(!substituicao){
            res.status(404).json({error: "Nao encontrado"});
        }
        if(dataSubstituicao !== undefined) substituicao.dataSubstituicao = dataSubstituicao;
        if(obsevacao !== undefined) substituicao.obsevacao = obsevacao;

        await substituicao.save();
    }catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro ao atualizar os substituicao" });
    }
}

export async function deletarSubstituicao(req, res){
    try {
        const {id} = req.params;
        const substituicao = await substituicaoModels.findByPk(id);
        if(!substituicao){
            res.status(404).json({error: "Nao encontrado"});
        }
        await substituicao.destroy()
        res.status(200).send();
    }catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro ao deletar os substituicao" });
    }
}



