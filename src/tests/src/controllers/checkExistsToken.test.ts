import { Request, Response, NextFunction } from 'express';
import { checkExistsToken } from '../../../middlewares/checkExistsToken';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

jest.mock('jsonwebtoken');

describe('checkExistsToken', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer test_token',
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

  it('deve chamar next se o token for válido', async () => {
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null); 
    });

    await checkExistsToken(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('deve retornar erro 401 se o token for inválido', async () => {
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error('Token inválido')); // Simula um erro de token
    });

    await checkExistsToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith('Não foi possível autenticar usuário.');
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar erro 401 se o segredo não estiver definido', async () => {
    process.env.SECRET = undefined; 

    await checkExistsToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith('Não foi possível autenticar usuário.');
    expect(next).not.toHaveBeenCalled();
  });
});
