
import { Request, Response, NextFunction } from 'express';
import Tutor from '../models/tutor.model';

// TO-DO: adicionar verificação de adestradores e passeadores 
export const checkExistsUserEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userEmail = req.body.email; 
  try {
      const userIsTutor = await Tutor.findOne({
        where: { email: userEmail }
      });

      if (userIsTutor) {
        res.status(400).json({ message: 'Email já está em uso.' });
        return;
      }
    
      next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar o email.' });
  }
    
};