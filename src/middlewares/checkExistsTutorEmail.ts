
import { Request, Response, NextFunction } from 'express';
import Tutor from '../models/tutor.model';


export const checkExistsTutorEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userEmail = req.body.email; 
  try {
      const user = await Tutor.findOne({
        where: { email: userEmail }
      });

      if (user) {
        res.status(400).json({ message: 'Email já está em uso.' });
        return;
      }
    
      next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar o email.' });
  }
    
};