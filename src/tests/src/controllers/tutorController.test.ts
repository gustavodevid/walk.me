import request from 'supertest';
import app from '../../../app'; 
import TutorService from '../../../services/tutor.service';
import { jest } from '@jest/globals';
import { TutorData } from '../../../types/tutor.type';
import bcrypt from 'bcrypt';

jest.mock('../../../services/tutor.service'); 

describe('TutorController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /tutors', () => {
    it('Deve retornar todos os tutores', async () => {
      const mockTutors: TutorData[] = [
        {
          tutorId: '1',
          email: 'tutor1@example.com',
          nome: 'Tutor 1',
          senha: 'hashed_password',
          pets: [],
        }, 
      ];

      (TutorService.getAllTutors as jest.Mock).mockResolvedValue(mockTutors);
      
      const response = await request(app).get('/v1/tutors'); 
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toEqual(mockTutors[0]); 
    });
  });

  describe('GET /tutors/:id', () => {
    it('Deve retornar um tutor pelo ID', async () => {
      const mockTutor: TutorData = {
        tutorId: '1',
        email: 'tutor@email.com',
        nome: 'Tutor 1',
        senha: 'hashed_password',
        pets: [],
      };

      (TutorService.getTutorByPk as jest.Mock).mockResolvedValue(mockTutor);
      
      const response = await request(app).get('/v1/tutors/1'); 
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTutor);
    });
  });

  describe('POST /tutors', () => {
    it('Deve criar um novo tutor', async () => {
      const tutorData = { nome: 'Teste', email: 'teste@example.com', senha: '123456' };
      const createdTutor: TutorData = {
        tutorId: '1',
        ...tutorData,
        pets: [],
      };

      (TutorService.createTutor as jest.Mock).mockResolvedValue(createdTutor);
      
      const response = await request(app).post('/v1/tutors').send(tutorData);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('tutorId'); 
      expect(response.body.nome).toBe('Teste');
    });
  });

  describe('DELETE /tutors/:id', () => {
    it('Deve remover um tutor pelo ID', async () => {
      const id = '1'; // Mudado para string para coincidir com TutorId
      (TutorService.removeTutorByPk as jest.Mock).mockResolvedValue({ message: 'Tutor removido com sucesso' });
      
      const response = await request(app).delete(`/v1/tutors/${id}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Tutor removido com sucesso');
    });
  });

  describe('POST /tutors/login', () => {
    it('Deve logar um tutor com credenciais corretas', async () => {
      const loginData = { email: 'teste@example.com', senha: '123456' };
      const user = { 
        tutorId: '1', 
        email: 'teste@example.com', 
        senha: await bcrypt.hash('123456', 10),
        nome: 'Teste',
        pets: [] 
      };

      (TutorService.getTutorByEmail as jest.Mock).mockResolvedValue(user);
      
      const response = await request(app).post('/v1/tutors/login').send(loginData); 
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('string');
    });

    it('Deve retornar 404 se o email não for encontrado', async () => {
      const loginData = { email: 'inexistente@example.com', senha: '123456' };
      (TutorService.getTutorByEmail as jest.Mock).mockResolvedValue(null);
      
      const response = await request(app).post('/v1/tutors/login').send(loginData); 
      
      expect(response.status).toBe(404);
      expect(response.body).toBe('Email não encontrado!');
    });

    it('Deve retornar 401 se a senha for inválida', async () => {
      const loginData = { email: 'teste@example.com', senha: 'senhaErrada' };
      const user = { 
        tutorId: '1', 
        email: 'teste@example.com', 
        senha: await bcrypt.hash('123456', 10),
        nome: 'Teste',
        pets: [] 
      };

      (TutorService.getTutorByEmail as jest.Mock).mockResolvedValue(user);
      
      const response = await request(app).post('/v1/tutors/login').send(loginData);
      
      expect(response.status).toBe(401);
      expect(response.body).toBe('Senha inválida!');
    });
  });
});
