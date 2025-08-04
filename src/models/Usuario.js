import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/database";
import * as timers from "node:timers";

const Usuario = sequelize.define("Usuario", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senhaHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nivelAcesso: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
    },
}, {
    tableName: "usuarios",
    timestamps: true
    });

export default Usuario;