import { Sequelize } from 'sequelize-typescript';
import Tutor from './tutor';

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
	console.log(username);
	console.log(password);
	const client = new Sequelize({
		database,
		username,
		password,
		host,
		dialect: 'postgres',
		models: [Tutor],
		port,
	});

	await Tutor.sync();

	return { client, Tutor };
}
