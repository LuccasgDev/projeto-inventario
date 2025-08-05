import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({erro: "Token nao fornecido"})
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({error: "Formato do token invalido"})
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({error: "Formato do token invalido"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            nivelAcesso: decoded.nivelAcesso,
        }
    }catch (error) {
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({error: "Token expirado"})
        }
        if(error.name === "JsonWebTokenError") {
            return res.status(401).json({error: "Token invalido"})
        }
        console.error('Erro na verificação do token:', error)
        return res.status(500).json({error: 'Erro na autenticação'})
    }
}