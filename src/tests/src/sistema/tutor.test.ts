import {
	PostgreSqlContainer,
	StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { getSequelize } from '../database';
import { Sequelize } from 'sequelize-typescript';
import Tutor from '../../../models/tutor.model';
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
	await Tutor.create({
		nome: 'Tulio',
		email: 'teste@teste.com',
		senha: '1234',
	});
});

afterAll(async () => {
	// Close connections
	await client.close();
	await container.stop();
});

describe('must trigger the operation of the api from the routes', () => {
	it('GET /tutor', async () => {
		const response = await request(app).get('/v1/tutor/');
		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					nome: 'Tulio',
					email: 'teste@teste.com',
					senha: expect.any(String),
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
					tutorId: expect.any(String),
				}),
			])
		);
	}, 60000);
	it('POST /tutor', async () => {
		const response = await request(app).post('/v1/tutor/').send({
			email: 'teste2@teste.com',
			nome: 'Messyas',
			senha: '1222',
		});
		await Tutor.destroy({
			where: {
				email: 'teste2@teste.com',
			},
		});
		expect(response.status).toBe(StatusCodes.CREATED);
		expect(response.body).toEqual(
			expect.objectContaining({
				nome: 'Messyas',
				email: 'teste2@teste.com',
				senha: expect.any(String),
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				tutorId: expect.any(String),
			})
		);
	}, 60000);
	it('DELETE /tutor', async () => {
		const novoTutor = await Tutor.create({
			email: 'teste2@teste.com',
			nome: 'Messyas',
			senha: '1222',
		});
		const id = novoTutor?.dataValues.tutorId;
		const response = await request(app).delete('/v1/tutor/' + id);
		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body).toBe(1);
	}, 60000);
});
