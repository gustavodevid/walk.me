import { Request, Response } from 'express';
import AdestradorService from '../services/adestrador.service';

class AdestradorController {
  public async getAllAdestradors(req: Request, res: Response): Promise<void> {
    try {
      const Adestradors = await AdestradorService.getAllAdestradors();
      res.json(Adestradors);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  public async getAdestradorByPk(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const Adestrador = await AdestradorService.getAdestradorByPk(id);
      res.json(Adestrador);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createAdestrador(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, especialidade, senha } = req.body;
      const Adestrador = await AdestradorService.createAdestrador(nome, email, especialidade, senha);
      res.status(201).json(Adestrador);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new AdestradorController();
