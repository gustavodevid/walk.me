import { Request, Response } from 'express';
import PasseadorService from '../services/passeador.service';

class PasseadorController {
  public async getAllPasseadors(req: Request, res: Response): Promise<void> {
    try {
      const Passeadors = await PasseadorService.getAllPasseadors();
      res.json(Passeadors);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  public async getPasseadorByPk(req: Request, res: Response): Promise<void> {
    try {
      const Passeador = await PasseadorService.getPasseadorByPk();
      res.json(Passeador);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createPasseador(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, disponibilidade, senha } = req.body;
      const Passeador = await PasseadorService.createPasseador(nome, email, disponibilidade, senha);
      res.status(201).json(Passeador);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new PasseadorController();
