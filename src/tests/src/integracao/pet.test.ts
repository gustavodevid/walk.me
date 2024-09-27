import {
	PostgreSqlContainer,
	StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { getSequelize } from '../database';
import Pet from '../../../models/pet.model';
import { Sequelize } from 'sequelize-typescript';
import Tutor from '../../../models/tutor.model';

let container: StartedPostgreSqlContainer;
let client: Sequelize;
let id: number;

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

	const tutor = await Tutor.findOne({
		where: {
			email: 'teste@teste.com',
		},
	});
	id = tutor?.dataValues.tutorId;

	await Pet.create({
		nome: 'floquinho',
		raca: 'Lhasa Apso',
		idade: 3,
		tutorId: id,
	});
});

afterAll(async () => {
	// Close connections
	await client.close();
	await container.stop();
});

describe('should connect to postgres and return a query result', () => {
	it('pet findAll', async () => {
		// Get all users
		const pets = await Pet.findAll();

		// Acessando dataValues para a verificação
		const petDataValues = pets.map((pet) => pet.dataValues);

		expect(petDataValues).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					nome: 'floquinho',
					raca: 'Lhasa Apso',
					idade: 3,
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date),
					petId: expect.any(String),
					tutorId: id,
				}),
			])
		);
	}, 60000);

	it('pet destroy', async () => {
		const result = await Pet.destroy({
			where: { tutorId: id },
		});

		await Pet.create({
			nome: 'floquinho',
			raca: 'Lhasa Apso',
			idade: 3,
			tutorId: id,
		});

		expect(result).toBe(1);
	}, 60000);

	it('pet create', async () => {
		const pet = await Pet.create({
			nome: 'pluto',
			raca: 'bloodhound',
			idade: 5,
			tutorId: id,
		});
		const petDataValues = pet.dataValues;

		await Pet.destroy({
			where: {
				nome: 'pluto',
			},
		});

		expect(petDataValues).toEqual(
			expect.objectContaining({
				nome: 'pluto',
				raca: 'bloodhound',
				idade: 5,
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
				petId: expect.any(String),
				tutorId: id,
			})
		);
	}, 60000);

	it('pet findOne', async () => {
		const pet = await Pet.findOne({
			where: { nome: 'floquinho' },
		});
		const petDataValues = pet?.dataValues;

		expect(petDataValues).toEqual(
			expect.objectContaining({
				nome: 'floquinho',
				raca: 'Lhasa Apso',
				idade: 3,
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
				petId: expect.any(String),
				tutorId: id,
			})
		);
	}, 60000);
});
