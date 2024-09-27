import {
	PostgreSqlContainer,
	StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { getSequelize } from '../database';
import { Sequelize } from 'sequelize-typescript';
import Tutor from '../../../models/tutor.model';

let container: StartedPostgreSqlContainer;
let client: Sequelize;

beforeAll(async () => {
	// Create a container using testcontainers
	container = await new PostgreSqlContainer().start();
	// Use the details from the container, create the database client
	client = await getSequelize({
		database: container.getDatabase(),
		username: container.getUsername(),
		password: container.getPassword(),
		host: container.getHost(),
		port: container.getPort(),
	});

	// Check if you have access to the database
	await client.authenticate();
	// Create a user
	await Tutor.create({
		email: 'teste@teste.com',
		nome: 'Hancock',
		senha: '1234',
	});
});

afterAll(async () => {
	// Close connections
	if (client) {
		await client.close();
	}
	if (container) {
		await container.stop();
	}
});

describe('should connect to postgres and return a query result', () => {
	it('tutor findAll', async () => {
		// Get all users
		const tutors = await Tutor.findAll();

		// Acessando dataValues para a verificação
		const tutorDataValues = tutors.map((tutor: Tutor) => tutor.dataValues);

		expect(tutorDataValues).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					email: 'teste@teste.com',
					nome: 'Hancock',
					senha: '1234',
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date),
					tutorId: expect.any(String),
				}),
			])
		);
	}, 60000);

	it('tutor destroy', async () => {
		const result = await Tutor.destroy({
			where: { email: 'teste@teste.com' },
		});

		await Tutor.create({
			email: 'teste@teste.com',
			nome: 'Hancock',
			senha: '1234',
		});

		expect(result).toBe(1);
	}, 60000);

	it('tutor create', async () => {
		const tutor = await Tutor.create({
			email: 'teste2@teste.com',
			nome: 'Davi',
			senha: '1221',
		});
		const tutorDataValues = tutor.dataValues;

		await Tutor.destroy({
			where: {
				email: 'teste2@teste.com',
			},
		});

		expect(tutorDataValues).toEqual(
			expect.objectContaining({
				email: 'teste2@teste.com',
				nome: 'Davi',
				senha: '1221',
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
				tutorId: expect.any(String),
			})
		);
	}, 60000);

	it('tutor findOne', async () => {
		const tutor = await Tutor.findOne({
			where: { email: 'teste@teste.com' },
		});
		const tutorDataValues = tutor?.dataValues;
		expect(tutorDataValues).toEqual(
			expect.objectContaining({
				email: 'teste@teste.com',
				nome: 'Hancock',
				senha: '1234',
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
				tutorId: expect.any(String),
			})
		);
	}, 60000);
});
