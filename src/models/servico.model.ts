
import { Geometry } from 'geojson';
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Default, ForeignKey} from 'sequelize-typescript';
import Adestrador from './adestrador.model';
import Passeador from './passeador.model';
import Tutor from './tutor.model';
import Pet from './pet.model';
import Anuncio from './anuncio.model';

@Table
export default class Servico extends Model {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  servicoId!: string;

  @ForeignKey(() => Anuncio)
  @Column(DataType.UUID)
  anuncioId!: string;

  @Column(DataType.GEOMETRY)
  localizacaoServico!: Geometry;

  @Column(DataType.DATE)
  dataServico!: Date;


  @Column(DataType.STRING)
  status!: string;

  @ForeignKey(() => Pet)
  @Column(DataType.UUID)
  petId!: string;
  
  @Column({
    type: DataType.ENUM,
    values: ['passeio', 'adestramento']
  })
  tipoServico!:string
}
