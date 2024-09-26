import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { getSequelize } from './database';
import { DataType } from 'sequelize-typescript';

describe('should connect and return a query result', () => {
	it('works with postgres', async () => {
		// Create a container using testcontainers
		const container = await new PostgreSqlContainer().start();
		// Use the details from the container, create the database client
		const { client, Tutor } = await getSequelize({
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
		// Get all users
		const tutors = await Tutor.findAll();
		// Check that the expected user is present
		expect(tutors).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					email: 'teste@teste.com',
					nome: 'Hancock',
					senha: '1234',
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date),
					tutorId: expect.any(DataType.UUID),
				}),
			])
		);
		// Close connections
		await client.close();
		await container.stop();
	}, 25000);
});
