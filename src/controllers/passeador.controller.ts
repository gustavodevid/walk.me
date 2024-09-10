import { Request, Response } from 'express';
import PasseadorService from '../services/passeador.service';
import { StatusCodes } from 'http-status-codes';

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
		const id = req.params.id;
		try {
			const Passeador = await PasseadorService.getPasseadorByPk(id);
			res.json(Passeador);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	public async createPasseador(req: Request, res: Response): Promise<void> {
		try {
			const { nome, email, disponibilidade, senha } = req.body;
			const Passeador = await PasseadorService.createPasseador(
				nome,
				email,
				disponibilidade,
				senha
			);
			res.status(StatusCodes.CREATED).json(Passeador);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}

	public async removePasseadorByPk(
		req: Request,
		res: Response
	): Promise<void> {
		const id = req.params.id;
		try {
			const passeadorRemoved = await PasseadorService.removePasseadorByPk(
				id
			);
			res.status(StatusCodes.OK).json(passeadorRemoved);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}
}

export default new PasseadorController();
