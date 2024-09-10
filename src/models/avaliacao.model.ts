import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
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

	@BelongsTo(() => Servico)
	servico!: Servico;
}
