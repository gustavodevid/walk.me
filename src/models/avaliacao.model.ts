
import { Geometry } from 'geojson';
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Default, ForeignKey} from 'sequelize-typescript';
import Adestrador from './adestrador.model';
import Passeador from './passeador.model';
import Tutor from './tutor.model';
import Pet from './pet.model';
import Servico from './servico.model';

@Table
export default class Avaliacao extends Model {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  avaliacaoId!: string;

  @ForeignKey(() => Servico)
  @Column(DataType.UUID)
  servicoId!: string;

  @Column(DataType.INTEGER)
  nota!: number;

  @Column(DataType.STRING)
  comentario?: string;

  @Column(DataType.UUID)
  profissionalId!: string;

}
