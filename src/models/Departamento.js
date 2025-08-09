import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Departamento = sequelize.define("Departamento", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "departamentos",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["nome"] },
        { fields: ["createdAt"] },
    ],
});

export default Departamento;
