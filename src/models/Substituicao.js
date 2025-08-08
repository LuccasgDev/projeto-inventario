import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Componente from "./Componente.js";
import Equipamento from "./Equipamento.js";

const Substituicao = sequelize.define("Substituicao", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    dataSubstituicao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    observacao: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: "substituicoes",
    timestamps: true,
});

// Associações
Substituicao.belongsTo(Equipamento, { foreignKey: "equipamentoId" });
Equipamento.hasMany(Substituicao, { foreignKey: "equipamentoId" });

Substituicao.belongsTo(Componente, { as: "componenteAntigo", foreignKey: "componenteAntigoId" });
Substituicao.belongsTo(Componente, { as: "componenteNovo", foreignKey: "componenteNovoId" });

export default Substituicao;
