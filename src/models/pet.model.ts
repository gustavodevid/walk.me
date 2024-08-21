import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Tutor from './tutor.model';

interface PetAttributes {
    id: string;
    nome: string;
    raca: string;
    idade: number;
    foto?: string;
    tutorId: string;
}

interface PetCreationAttributes 
    extends Optional<PetAttributes, 'id'> {}

interface PetInstance 
    extends Model<PetAttributes, PetCreationAttributes>, 
    PetAttributes {
        createdAt?: Date;
        updatedAt?: Date;
}

const Pet = sequelize.define<PetInstance>('Pet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
  },
  nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
  raca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tutorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Tutor,
      key: 'id',
    }
  }
});

export default Pet;
