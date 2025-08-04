import Departamento from "../models/Departamento.js";

export async function listarDepartamentos(req, res) {
    try {
        const departamentos = await Departamento.findAll();
        res.json(departamentos);
    }catch (erro){
        res.status(500).json({message: "Erro ao lista departamento"});
    }
}

export async function criarDepartamento(req, res) {
    try {
        const {nome , descricao} = req.body;
        const novoDepartamento = await Departamento.create({nome, descricao});
        res.status(201).json(novoDepartamento);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Erro ao criar departamento"});
    }
}

export async function DetalharDepartamento(req, res) {
    try {
        const {id} = req.params;
        const departamento = await Departamento.findByPk(id);
        if(!departamento){
            return res.status(404).json({message: "Departamento nao encontrado"});
        }
        res.status(200).json(departamento);
    }catch (erro){
        res.status(500).json({message: "Erro ao detalhar departamento"});
    }
}

export async function atualizarDepartamento(req, res) {
    try {
        const {id} = req.params;
        const {nome, descricao} = req.body;
        const departamento = await Departamento.findByPk(id);
        if(!departamento){
            return res.status(404).json({message: "Departamento nao encontrado"});
        }









    }
}