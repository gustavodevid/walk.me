import { Geometry } from 'geojson';
import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	ForeignKey,
	HasMany,
} from 'sequelize-typescript';
import Adestrador from './adestrador.model';
import Passeador from './passeador.model';
import Tutor from './tutor.model';
import Pet from './pet.model';
import Anuncio from './anuncio.model';
import Avaliacao from './avaliacao.model';

@Table
export default class Servico extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	servicoId!: string;

	@Column(DataType.DATE)
	dataServico!: Date;

	@Column(DataType.GEOMETRY)
	localizacaoServico!: Geometry;

	@Column(DataType.STRING)
	status!: string;

	@Column({
		type: DataType.ENUM,
		values: ['passeio', 'adestramento'],
	})
	tipoServico!: string;

	@ForeignKey(() => Tutor)
	@Column(DataType.UUID)
	tutorId!: string;

	@ForeignKey(() => Pet)
	@Column(DataType.UUID)
	petId!: string;

	@ForeignKey(() => Adestrador)
	@Column(DataType.UUID)
	adestradorId?: string;

	@ForeignKey(() => Passeador)
	@Column(DataType.UUID)
	passeadorId?: string;

	@HasMany(() => Avaliacao)
	avaliacoes!: Avaliacao[];
}
