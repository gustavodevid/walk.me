import { Request, Response } from 'express';
import AnuncioService from '../services/anuncio.service';
import { StatusCodes } from 'http-status-codes';

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

	public async getAnunciosAdestrador(
		req: Request,
		res: Response
	): Promise<void> {
		try {
			const Anuncio = await AnuncioService.getAnunciosAdestrador();
			res.json(Anuncio);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	public async getAnunciosPasseador(
		req: Request,
		res: Response
	): Promise<void> {
		try {
			const Anuncio = await AnuncioService.getAnunciosPasseador();
			res.json(Anuncio);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	public async createAnuncio(req: Request, res: Response): Promise<void> {
		try {
			const {
				preco,
				descricao,
				dataAnuncio,
				localizacao,
				tipoProfissional,
				idProfissional,
			} = req.body;
			const Anuncio = await AnuncioService.createAnuncio(
				preco,
				descricao,
				dataAnuncio,
				localizacao,
				tipoProfissional,
				idProfissional
			);
			res.status(StatusCodes.CREATED).json(Anuncio);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	public async removeAnuncioByPk(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;
			const anuncioRemoved = await AnuncioService.removeAnuncioByPk(id);
			res.status(StatusCodes.OK).json(anuncioRemoved);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error ',
			});
		}
	}
}

export default new AnuncioController();
