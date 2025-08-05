import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Departamento from './Departamento.js';

const Equipamento = sequelize.define('Equipamento', {
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
Equipamento.belongsTo(Departamento, { foreignKey: 'departamentoId' });
Departamento.hasMany(Equipamento, { foreignKey: 'departamentoId' });

export default Equipamento;