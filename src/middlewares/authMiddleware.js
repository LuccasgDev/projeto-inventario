import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: "Formato do token inválido" });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: "Formato do token inválido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            nivelAcesso: decoded.nivelAcesso,
        };

        // >>>>> MUITO IMPORTANTE: seguir fluxo chamando next()
        return next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expirado" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Token inválido" });
        }
        console.error('Erro na verificação do token:', error);
        return res.status(500).json({ error: 'Erro na autenticação' });
    }
}

export function adminMiddleware(req, res, next) {
    // garante que o usuário esteja autenticado antes de checar nível
    if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    if (req.user.nivelAcesso !== "admin") {
        return res.status(403).json({ error: 'Acesso restrito a administradores' });
    }
    next();
}
