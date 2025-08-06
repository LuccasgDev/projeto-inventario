import {DataTypes} from "sequelize";
import {sequelize} from "../config/database.js";
import ComponenteModels from "./componenteModels.js";
import equipamento  from "./equipamentoModels.js";
import EquipamentoModels from "./equipamentoModels.js";
import componente from "./componenteModels.js";

const SubstituicaoModels = sequelize.define("Substituicao", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    dataSubstituicao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    obsevacao: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
},{
    tableName: "SubstituicaoModels",
    timestamps: true,
})

SubstituicaoModels.belongsTo(EquipamentoModels, {foreignKey: "equipamentoId"})
EquipamentoModels.hasMany(SubstituicaoModels, {foreignKey: "equipamentoId"})


SubstituicaoModels.belongsTo(ComponenteModels, {as: "componenteAntigo", foreignKey: "componenteAntigoId"})
SubstituicaoModels.belongsTo(ComponenteModels, {as:"componenteNovo", foreignKey: "componenteNovoId"})

export default SubstituicaoModels;