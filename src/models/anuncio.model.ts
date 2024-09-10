import { Geometry } from 'geojson';
import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import Adestrador from './adestrador.model';
import Passeador from './passeador.model';

@Table
export default class Anuncio extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	anuncioId!: string;

	@Column(DataType.FLOAT)
	preco!: number;

	@Column(DataType.STRING)
	descricao!: string;

	@Column(DataType.DATE)
	dataAnuncio!: Date;

	@Column(DataType.GEOMETRY)
	localizacao!: Geometry;

	@ForeignKey(() => Adestrador)
	@Column(DataType.UUID)
	adestradorId?: string;

	@ForeignKey(() => Passeador)
	@Column(DataType.UUID)
	passeadorId?: string;

	@BelongsTo(() => Adestrador)
	adestrador?: Adestrador;

	@BelongsTo(() => Passeador)
	passeador?: Passeador;
}
