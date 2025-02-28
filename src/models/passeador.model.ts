import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    HasMany,
    Unique,
} from 'sequelize-typescript';
import Anuncio from './anuncio.model';

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

    @Unique
    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    disponibilidade!: string;

    @Column(DataType.STRING)
    senha!: string;

    // Novas colunas para a localização do passeador
    @Column(DataType.STRING)
    latitude!: string; 

    @Column(DataType.STRING)
    longitude!: string;

	// Nova coluna para a avaliação do passeador
	@Column(DataType.FLOAT) 
	avaliacao!: number;

    @HasMany(() => Anuncio)
    anuncios!: Anuncio[];
}