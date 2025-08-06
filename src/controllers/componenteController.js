import ComponenteModels from "../models/componenteModels.js";
import componente from "../models/componenteModels.js";

export async function criarComponente(req,res){
    try{
        const {tipo, marca, modelo, observacao} = req.body;
        const novoComponente = await ComponenteModels.create({tipo, marca, modelo, observacao});
        res.status(201).json(novoComponente);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar o ComponenteModels" });
    }
}

export async function listarComponente(req,res){
    try {
        const componentes = await ComponenteModels.findAll()
        res.join(componentes)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar ComponenteModels" });
    }
}

export async function detalharComponente(req,res){
    try{
        const {id} = req.params;
        const componetes = await ComponenteModels.findByPk(id);
        if(!componetes){
            res.status(404).json({error: "ComponenteModels nao encontrado"})
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao detalhar ComponenteModels" });
    }
}

export async function atualizarComponente(req,res){
    try{
        const {id} = req.params;
        const {tipo, marca, modelo, observacao} = req.body;
        const novoComponente = await ComponenteModels.findByPk(id);
        if(!novoComponente){
            res.status(404).json({error: "ComponenteModels nao encontrado"})
        }
        if (tipo !== undefined) componente.tipo = tipo;
        if(marca !== undefined) componente.marca = marca;
        if(modelo !== undefined) componente.modelo = modelo;
        if (observacao !== undefined) componente.observacao = observacao;

        await componente.save();
        res.status(200).json({message: 'ComponenteModels atualizado'});
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar ComponenteModels" });
    }
}

export async function deletarComponente(req,res){
    try{
        const {id} = req.params;
        const componente = await componente.findByPk(id);
        if(!componente){
            res.status(404).json({error: "ComponenteModels nao encontrado"})
        }
        await componente.destroy()
        res.status(200).sed()
    }catch(error){
      console.error(error)
      res.status(500).json({error:"Erro ao deletar componente"})
    }
}