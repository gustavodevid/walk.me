import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export default class Adestrador extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  adestradorId!: number;

  @Column(DataType.STRING)
  nome!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  especialidade!: string;

  @Column(DataType.STRING)
  senha!: string;
}
