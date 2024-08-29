import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export default class Passeador extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  passeadorId!: string;

  @Column(DataType.STRING)
  nome!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  disponibilidade!: string;

  @Column(DataType.STRING)
  senha!: string;
}

