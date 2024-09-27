import {
	PostgreSqlContainer,
	StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { getSequelize } from '../database';
import { Sequelize } from 'sequelize-typescript';
import Passeador from '../../../models/passeador.model';
import app from '../../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

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
	const passeador = await Passeador.create({
		email: 'teste@teste.com',
		nome: 'Tulio',
		disponibilidade: 'tarde',
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

describe('must trigger the operation of the api from the routes', () => {
	it('GET /passeador', async () => {
		const response = await request(app).get('/v1/passeador/');

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					nome: 'Tulio',
					disponibilidade: 'tarde',
					email: 'teste@teste.com',
					senha: expect.any(String),
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
					passeadorId: expect.any(String),
				}),
			])
		);
	}, 60000);

	it('POST /passeador', async () => {
		const response = await request(app).post('/v1/passeador/').send({
			email: 'teste2@teste.com',
			nome: 'Messyas',
			disponibilidade: 'tarde',
			senha: '1222',
		});

		await Passeador.destroy({
			where: {
				email: 'teste2@teste.com',
			},
		});

		expect(response.status).toBe(StatusCodes.CREATED);
		expect(response.body).toEqual(
			expect.objectContaining({
				nome: 'Messyas',
				disponibilidade: 'tarde',
				email: 'teste2@teste.com',
				senha: expect.any(String),
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				passeadorId: expect.any(String),
			})
		);
	}, 60000);

	it('DELETE /passeador', async () => {
		const novoPasseador = await Passeador.create({
			email: 'teste2@teste.com',
			nome: 'Messyas',
			disponibilidade: 'tarde',
			senha: '1222',
		});
		const id = novoPasseador?.dataValues.passeadorId;

		const response = await request(app).delete('/v1/passeador/' + id);

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body).toBe(1);
	}, 60000);
});
