import { Sequelize } from 'sequelize-typescript';
import Pet from '../../models/pet.model';
import Tutor from '../../models/tutor.model';
import Adestrador from '../../models/adestrador.model';
import Passeador from '../../models/passeador.model';
import Servico from '../../models/servico.model';
import Avaliacao from '../../models/avaliacao.model';
import Anuncio from '../../models/anuncio.model';

interface GetSequelizeArgs {
	database: string;
	username: string;
	password: string;
	host: string;
	port: number;
}

export async function getSequelize({
	database,
	username,
	password,
	host,
	port,
}: GetSequelizeArgs) {
	const client = new Sequelize({
		database,
		username,
		password,
		host,
		dialect: 'postgres',
		models: [
			Tutor,
			Pet,
			Adestrador,
			Passeador,
			Servico,
			Avaliacao,
			Anuncio,
		],
		port,
	});

	// await client.sync();
	await Tutor.sync();
	await Pet.sync();
	await Passeador.sync();
	await Adestrador.sync();
	// await Anuncio.sync();

	return client;
}
