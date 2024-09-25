import { Request, Response, NextFunction } from 'express';
import { checkExistsUserEmail } from '../../../middlewares/checkExistsUserEmail';
import Tutor from '../../../models/tutor.model';
import Adestrador from '../../../models/adestrador.model';
import Passeador from '../../../models/passeador.model';

jest.mock('../../../models/tutor.model');
jest.mock('../../../models/adestrador.model');
jest.mock('../../../models/passeador.model');

describe('checkExistsUserEmail', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar next se o email não existir', async () => {
    (Tutor.findOne as jest.Mock).mockResolvedValue(null);
    (Adestrador.findOne as jest.Mock).mockResolvedValue(null);
    (Passeador.findOne as jest.Mock).mockResolvedValue(null);

    await checkExistsUserEmail(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email já estiver em uso por um Tutor', async () => {
    (Tutor.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });
    (Adestrador.findOne as jest.Mock).mockResolvedValue(null);
    (Passeador.findOne as jest.Mock).mockResolvedValue(null);

    await checkExistsUserEmail(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email já está em uso.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email já estiver em uso por um Adestrador', async () => {
    (Tutor.findOne as jest.Mock).mockResolvedValue(null);
    (Adestrador.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });
    (Passeador.findOne as jest.Mock).mockResolvedValue(null);

    await checkExistsUserEmail(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email já está em uso.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email já estiver em uso por um Passeador', async () => {
    (Tutor.findOne as jest.Mock).mockResolvedValue(null);
    (Adestrador.findOne as jest.Mock).mockResolvedValue(null);
    (Passeador.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

    await checkExistsUserEmail(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email já está em uso.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro 500 em caso de exceção', async () => {
    (Tutor.findOne as jest.Mock).mockRejectedValue(new Error('Erro ao buscar tutor'));

    await checkExistsUserEmail(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao verificar o email.' });
    expect(next).not.toHaveBeenCalled();
  });
  it('deve retornar erro 500 em caso de exceção ao buscar Tutor', async () => {
    (Tutor.findOne as jest.Mock).mockRejectedValue(new Error('Erro ao buscar tutor'));

    await checkExistsUserEmail(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao verificar o email.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro 500 em caso de exceção ao buscar Adestrador', async () => {
    (Tutor.findOne as jest.Mock).mockResolvedValue(null);
    (Adestrador.findOne as jest.Mock).mockRejectedValue(new Error('Erro ao buscar adestrador'));

    await checkExistsUserEmail(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao verificar o email.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro 500 em caso de exceção ao buscar Passeador', async () => {
    (Tutor.findOne as jest.Mock).mockResolvedValue(null);
    (Adestrador.findOne as jest.Mock).mockResolvedValue(null);
    (Passeador.findOne as jest.Mock).mockRejectedValue(new Error('Erro ao buscar passeador'));

    await checkExistsUserEmail(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao verificar o email.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email for inválido', async () => {
    req.body.email = ''; 
    await checkExistsUserEmail(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email não for fornecido', async () => {
    req.body.email = undefined;

    await checkExistsUserEmail(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email tiver formato inválido', async () => {
    req.body.email = 'invalid-email-format';

    await checkExistsUserEmail(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email conter caracteres especiais', async () => {
    req.body.email = 'test!@example.com';
    await checkExistsUserEmail(req as Request, res as Response, next);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message:   
   'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });
  
  it('deve retornar a resposta como JSON', async () => {
    (Tutor.findOne as jest.Mock).mockResolvedValue(null);
    await checkExistsUserEmail(req as Request, res as Response, next);
  
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

  it('deve retornar erro se o email tiver espaços em branco', async () => {
    req.body.email = '   ';
    
    await checkExistsUserEmail(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email for um domínio inválido', async () => {
    req.body.email = 'test@invalid_domain';
    
    await checkExistsUserEmail(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email for muito longo', async () => {
    req.body.email = 'a'.repeat(255) + '@example.com'; // Email com mais de 254 caracteres
     
    await checkExistsUserEmail(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email for apenas números', async () => {
    req.body.email = '1234567890';
    
    await checkExistsUserEmail(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email estiver em formato inválido com caracteres não permitidos', async () => {
    req.body.email = 'test@#example.com';
    
    await checkExistsUserEmail(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email for apenas um domínio', async () => {
    req.body.email = '@example.com';
    
    await checkExistsUserEmail(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro se o email tiver dois símbolos "@"', async () => {
    req.body.email = 'test@@example.com';
    
    await checkExistsUserEmail(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });
  
  it('deve retornar erro se o email começar ou terminar com um ponto', async () => {
    req.body.email = '.test@example.com';
    
    await checkExistsUserEmail(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
    
    req.body.email = 'test.@example.com';
    
    await checkExistsUserEmail(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });
  
  it('deve retornar erro se o email tiver uma sequência de pontos', async () => {
    req.body.email = 'test..example@example.com';
    
    await checkExistsUserEmail(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email inválido.' });
    expect(next).not.toHaveBeenCalled();
  });
});