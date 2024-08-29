import { Request, Response } from 'express';
import AnuncioService from '../services/anuncio.service';

class AnuncioController {
  public async getAllAnuncios(req: Request, res: Response): Promise<void> {
    try {
      const Anuncios = await AnuncioService.getAllAnuncios();
      res.json(Anuncios);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  public async getAnuncioByPk(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const Anuncio = await AnuncioService.getAnuncioByPk(id);
      res.json(Anuncio);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createAnuncio(req: Request, res: Response): Promise<void> {
    try {
      const { preco, descricao, dataAnuncio, localizacao, tipoProfissional, idProfissional } = req.body;
      const Anuncio = await AnuncioService.createAnuncio(preco, descricao, dataAnuncio, localizacao, tipoProfissional, idProfissional);
      res.status(201).json(Anuncio);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new AnuncioController();
