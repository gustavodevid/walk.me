import { Request, Response } from 'express';
import TutorService from '../services/tutor.service';
import { StatusCodes } from 'http-status-codes';

class TutorController {
	public async getAllTutors(req: Request, res: Response): Promise<void> {
		try {
			const Tutors = await TutorService.getAllTutors();
			res.json(Tutors);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}
	public async getTutorByPk(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		try {
			const Tutor = await TutorService.getTutorByPk(id);
			res.json(Tutor);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	public async createTutor(req: Request, res: Response): Promise<void> {
		try {
			const { nome, email, senha } = req.body;
			const Tutor = await TutorService.createTutor(nome, email, senha);
			res.status(StatusCodes.CREATED).json(Tutor);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	public async removeTutorByPk(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		try {
			const tutorRemoved = await TutorService.removeTutorByPk(id);
			res.status(StatusCodes.OK).json(tutorRemoved);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}
}

export default new TutorController();
