// src/config/database.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

export const sequelize = new Sequelize(connectionString, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        // Força SSL, aceita certificados auto-assinados (útil para provedores gerenciados)
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export async function connectDB() {
    try {
        if (connectionString) {
            const host = new URL(connectionString).hostname;
            console.log("Tentando conectar ao host:", host);
        }
        await sequelize.authenticate();
        console.log("✅ Conexão com o banco de dados estabelecida!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    }
}
