import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import Tutor from './tutor.model';

@Table
export default class Pet extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  petId!: number;

  @Column(DataType.STRING)
  nome!: string;

  @Column(DataType.STRING)
  raca!: string;

  @Column(DataType.INTEGER)
  idade!: number;

  @Column(DataType.STRING)
  foto?: string;

  @ForeignKey(() => Tutor)
  @Column(DataType.INTEGER)
  tutorId!: string;

  @BelongsTo(() => Tutor)
  tutor!: Tutor;
}

