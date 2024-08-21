import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Pet from './pet.model';

interface TutorAttributes {
    id: string;
    nome: string;
    email: string;
    senha: string;
}

interface TutorCreationAttributes 
    extends Optional<TutorAttributes, 'id'> {}

interface TutorInstance 
    extends Model<TutorAttributes, TutorCreationAttributes>, 
    TutorAttributes {
        createdAt?: Date;
        updatedAt?: Date;
}

const Tutor = sequelize.define<TutorInstance>('Tutor', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Tutor;
