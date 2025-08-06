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

