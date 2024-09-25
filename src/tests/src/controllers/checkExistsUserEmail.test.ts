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
});
