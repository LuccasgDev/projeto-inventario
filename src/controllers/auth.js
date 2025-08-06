import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UsuarioModels from "../models/usuarioModels.js";
import dotenv from "dotenv";
dotenv.config();
export async function register(req, res) {
    try{
    const {name, email, password} = req.body;
    const usuarioExistente = await UsuarioModels.findOne({where: {email}})
    if (usuarioExistente) {
        return res.status(400).json({erro: "Email ja Existe"})
    }
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(password, salt);

    const novoUsuario = await UsuarioModels.create({
        name,
        email,
        senhaHash,
        nivelAcesso: "user"
    })
    res.status(201).json({id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email});

    }catch (error) {
    console.error(error);
    res.status(500).json({error: "Erro em registrar usuario"});
    }
}

export async function login(req, res) {
    try {
        const {email, password} = req.body;
        const usuario = await UsuarioModels.findOne({where: {email}})
        if(!usuario) {
            return res.status(401).json({error: "Email ou senha invalidos"})
        }
        const token = jwt.sign({
            id: usuario.id, email: usuario.email, nivelAcesso: usuario.nivelAcesso},
            process.env.JWT_SECRET, {expiresIn: "8h"});
        res.json({token, nome: usuario.nome, nivelAcesso: usuario.nivelAcesso});
    }catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro em login"});
    }
}

export async function logout(req, res) {
    res.json({message: "Logout sucesso"})
}