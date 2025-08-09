import Usuario from "../models/Usuario.js";
import {resolveIdentifier} from "../utils/identifierHelper.js";

export async function criarUsuario(req, res) {
    try {
        const { nome, email, senhaHash, nivelAcesso } = req.body;

        if (!nome || !email || !senhaHash) {
            return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
        }

        const niveisValidos = ["user", "admin"];
        if (nivelAcesso && !niveisValidos.includes(nivelAcesso)) {
            return res.status(400).json({ error: "Nível de acesso inválido" });
        }

        const usuario = await Usuario.create({
            nome,
            email,
            senhaHash,
            nivelAcesso: nivelAcesso || "user"
        });

        res.status(201).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
}

export async function listarUsuario(req, res) {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar usuários" });
    }
}

export async function detalharUsuario(req, res) {
    try {
        const { id } = req.params;
        const usuario = await resolveIdentifier(Usuario, id)

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao detalhar usuário" });
    }
}

export async function atualizarUsuario(req, res) {
    try {
        const { id } = req.params;
        const { nome, email, senhaHash, nivelAcesso } = req.body;
        const usuario = await resolveIdentifier(Usuario, id)

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        if (nome !== undefined) usuario.nome = nome;
        if (email !== undefined) usuario.email = email;
        if (senhaHash !== undefined) usuario.senhaHash = senhaHash;

        if (nivelAcesso !== undefined) {
            const niveisValidos = ["user", "admin"];
            if (!niveisValidos.includes(nivelAcesso)) {
                return res.status(400).json({ error: "Nível de acesso inválido" });
            }
            usuario.nivelAcesso = nivelAcesso;
        }

        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
}

export async function deletarUsuario(req, res) {
    try {
        const { id } = req.params;
        const usuario = await resolveIdentifier(Usuario, id)

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        await usuario.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
}