import express from "express";
import dotenv from "dotenv";
import { sequelize, connectDB } from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import departamentoRoutes from "./routes/departamentoRoutes.js";
import equipamentoRoutes from "./routes/equipamentoRoutes.js";
import componenteRoutes from "./routes/componenteRoutes.js";
import substituicaoRoutes from "./routes/substituicaoRoutes.js";
import relatorioRoutes from "./routes/relatorioRoutes.js";

import authMiddleware from "./middlewares/authMiddleware.js";

dotenv.config();
const app = express();

// Configurações do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public"));

// Rota pública de status
app.get("/status", (req, res) => {
    res.json({
        status: "online",
        database: "connected",
        time: new Date().toISOString()
    });
});

// Rotas públicas
app.use("/auth", authRoutes);

// Middleware de autenticação
app.use(authMiddleware);

// Rotas protegidas
app.use("/departamentos", departamentoRoutes);
app.use("/equipamentos", equipamentoRoutes);
app.use("/componentes", componenteRoutes);
app.use("/substituicoes", substituicaoRoutes);
app.use("/relatorios", relatorioRoutes);

// Rota raiz
app.get("/", (req, res) => {
    res.redirect("/auth/login");
});

// Middleware 404
app.use((req, res) => {
    res.status(404).render("erro", {
        titulo: "Página não encontrada",
        mensagem: "A página solicitada não existe"
    });
});

// Middleware 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("erro", {
        titulo: "Erro interno",
        mensagem: "Ocorreu um erro no servidor"
    });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
(async () => {
    await connectDB();
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        console.log(`> Modo: ${process.env.NODE_ENV || "desenvolvimento"}`);
    });
})();
