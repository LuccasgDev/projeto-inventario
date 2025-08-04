import {DataTypes} from "sequelize";
import Sequelize from "sequelize";
import Departamento from "./Departamento.js";
import {sequelize} from "../config/database.js";

const Equipamento = sequelize.define("Equipamento", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tag: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    dataAquisicao: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
{
    tableName: "equipamentos",
        timestamps: true
})

Equipamento.belongsTo(Departamento, {foreignKey: "departamentoId"})
Departamento.belongsTo(Equipamento, {foreignKey: "departamentoId"})

export default Equipamento;