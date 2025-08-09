import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Departamento from "./Departamento.js";

const Equipamento = sequelize.define("Equipamento", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kdu: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 50],
            is: /^[A-Z0-9\-]+$/i
        }
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dataAquisicao: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: "equipamentos",
    indexes: [
        { unique: true, fields: ["tag"] },
        { unique: true, fields: ["kdu"], name: "uq_equipamentos_kdu" },
        { fields: ["departamentoId"] },
    ],
    hooks: {
        beforeValidate: (equip) => {
            if (equip.kdu && typeof equip.kdu === "string") {
                equip.kdu = equip.kdu.trim().toUpperCase();
            }
        },
    }
});

// Associações
Equipamento.belongsTo(Departamento, { foreignKey: "departamentoId" });
Departamento.hasMany(Equipamento, { foreignKey: "departamentoId" });

export default Equipamento;
