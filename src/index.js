import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import departamentoRoutes from './routes/departamentoRoutes.js';
import equipamentoRoutes from './routes/equipamentoRoutes.js';
import componenteRoutes from './routes/componenteRoutes.js';
import substituicaoController from "./routes/substituicaoRoutes.js";
import relatorioRoutes from './routes/relatorioRoutes.js';  // Corrigido
import authMiddleware from './middlewares/authMiddleware.js';

dotenv.config();
const app = express();

// Configurações do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para receber dados de formulários
app.set('view engine', 'ejs');
app.set('views', './src/views'); // Define o diretório de views
app.use(express.static('public')); // Serve arquivos estáticos

// Rotas públicas
app.use('/auth', authRoutes);

// Middleware de autenticação
app.use(authMiddleware);

// Rotas protegidas
app.use('/departamentos', departamentoRoutes);
app.use('/equipamentos', equipamentoRoutes);
app.use('/componentes', componenteRoutes);
app.use('/substituicoes', substituicaoController);
app.use('/relatorios', relatorioRoutes);

// Rota raiz redireciona para login
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

// Middleware para tratamento de erros 404
app.use((req, res) => {
    res.status(404).render('erro', {
        titulo: 'Página não encontrada',
        mensagem: 'A página solicitada não existe'
    });
});

// Middleware para tratamento de erros 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('erro', {
        titulo: 'Erro interno',
        mensagem: 'Ocorreu um erro no servidor'
    });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`> Servidor rodando em http://localhost:${PORT}`);
            console.log(`> Modo: ${process.env.NODE_ENV || 'desenvolvimento'}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao sincronizar banco de dados:", error);
        process.exit(1);
    });