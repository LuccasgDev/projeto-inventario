import usuarioModels from "../models/Usuario.js";

export async function criarUsuario(req, res) {
    try {
        const {nome, email, senhaHash, nivelAcesso} = req.body;

        if (!usuario || !senhaHash || !nivelAcesso) {
            res.status(400).json({error : "nome, email ou nivelAcesso sao obrigadorios"});
        }

        const niveisValidos = ["user", "admin"]
        if(nivelAcesso && !niveisValidos.includes(nivelAcesso)){
            res.status(400).json({error : "nivel de acesso invalido"});
        }
        const usuario = await usuarioModels.create({
            nome, email, senhaHash, nivelAcesso: nivelAcesso || "user",});

        res.status(200).json({usuario});
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "erro ao criar usuarios" });
    }
}

export async function listarUsuario(req, res) {
    try {
        const usuario = await usuarioModels.findAll()
        res.status(200).json({usuario});
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "erro ao listar usuario" });
    }
}

export async function detalharUsuario(req, res){
    try {
        const {id} = req.params;
        const usuario = usuarioModels.findByPk(id)
        if(!usuario){
            res.status(404).json({error: "Nada Detalhado"})
        }
        res.json(usuario)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "erro ao detalhar usuario" });
    }
}

export async function atualizarUsuario(req, res) {
    try {

        const {id} = req.params;
        const {nome, email, senhaHash, nivelAcesso} = req.body;
        const usuario = await usuarioModels.findByPk(id)
        if (!usuario) {
            res.status(404).json({error: "Nada Encontrado"})
        }
        if (nome !== undefined) usuarioModels.nome = nome;
        if (email !== undefined) usuarioModels.email = email;
        if (senhaHash !== undefined) usuarioModels.senha = senhaHash;
        if (nivelAcesso !== undefined) usuarioModels.nivelAcesso = nivelAcesso;
        await usuario.save();
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "erro ao atualizar usuario" });
    }
}

export async function deletarUsuario(req, res) {
    try{
        const {id} = req.params;
        const usuario = await usuarioModels.findByPk(id)
        if(!usuario){
            res.status(404).json({error: "Nada Encontrado"})
        }
        await usuario.destroy()
        await usuario.remove()
        res.status(200).send()
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "erro ao deletar usuario" });
    }
}