import {DataTypes} from "sequelize";
import sequelize from "../config/database.js"

const Componente = sequelize.define("Componente", {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    marca:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    modelo:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    observacao:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    },
{

    tableName: "Componente",
        timestamps: true
})

export default Componente;