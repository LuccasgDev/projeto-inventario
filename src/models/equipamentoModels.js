import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import DepartamentoModels from './departamentoModels.js';

const EquipamentoModels = sequelize.define('Equipamento', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING,
        unique: true
    },
    dataAquisicao: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'equipamentos'
});

// Associações
EquipamentoModels.belongsTo(DepartamentoModels, { foreignKey: 'departamentoId' });
DepartamentoModels.hasMany(EquipamentoModels, { foreignKey: 'departamentoId' });

export default EquipamentoModels;