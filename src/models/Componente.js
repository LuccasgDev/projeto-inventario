import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Componente = sequelize.define("Componente", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    observacao: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    }
}, {
    tableName: "componentes",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["kdu"], name: "uq_componentes_kdu" }
    ],
    hooks: {
        beforeValidate: (comp) => {
            // normaliza se existir
            if (comp.kdu && typeof comp.kdu === "string") {
                comp.kdu = comp.kdu.trim().toUpperCase();
            } else {
                const short = (comp.id && typeof comp.id === 'string')
                    ? comp.id.split('-')[0].toUpperCase()
                    : (Math.random().toString(36).slice(2, 8).toUpperCase());
                comp.kdu = `CMP-${short}`;
            }
        }
    }
});

export default Componente;
