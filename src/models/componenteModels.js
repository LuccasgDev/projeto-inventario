import {DataTypes} from "sequelize";
import sequelize from "../config/database.js"

const ComponenteModels = sequelize.define("Componente", {
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

    tableName: "ComponenteModels",
        timestamps: true
})

export default ComponenteModels;