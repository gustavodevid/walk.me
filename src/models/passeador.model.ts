import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export default class Passeador extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  passeadorId!: number;

  @Column(DataType.STRING)
  nome!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  disponibilidade!: string;

  @Column(DataType.STRING)
  senha!: string;
}

