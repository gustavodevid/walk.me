
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Default} from 'sequelize-typescript';

@Table
export default class Adestrador extends Model {

  @PrimaryKey
  
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  adestradorId!: string;

  @Column(DataType.STRING)
  nome!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  especialidade!: string;

  @Column(DataType.STRING)
  senha!: string;
}
