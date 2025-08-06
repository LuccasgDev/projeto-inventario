import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import authRoutes from './routes/auth.js';
import departamentoRoutes from './routes/departamentoRoutes.js'; // Importação corrigida
import authMiddleware from './middlewares/authMiddleware.js';

dotenv.config();
const app = express();

app.use(express.json());
app.set('view engine', 'ejs');

// Rotas públicas
app.use('/auth', authRoutes);

// Middleware de autenticação
app.use(authMiddleware);

// Rotas protegidas
app.use('/departamentos', departamentoRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true })
    .then(() => app.listen(PORT, () => console.log(`> Servidor rodando em http://localhost:${PORT}`)))
    .catch((error) => {
        console.error("Erro ao sincronizar banco de dados:", error);
        process.exit(1);
    });