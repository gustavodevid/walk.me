import { Request, Response } from 'express';
import TutorService from '../services/tutor.service';

class TutorController {
  public async getAllTutors(req: Request, res: Response): Promise<void> {
    try {
      const Tutors = await TutorService.getAllTutors();
      res.json(Tutors);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createTutor(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, senha } = req.body;
      const Tutor = await TutorService.createTutor(nome, email, senha);
      res.status(201).json(Tutor);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new TutorController();
