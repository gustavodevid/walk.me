
import { Request, Response, NextFunction } from 'express';
import Tutor from '../models/tutor.model';
import Adestrador from '../models/adestrador.model';
import Passeador from '../models/passeador.model';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// TO-DO: adicionar verificação de adestradores e passeadores 
export const checkExistsUserEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userEmail = req.body.email; 

  if (!userEmail || typeof userEmail !== 'string' || userEmail.trim() === '') {
    res.status(400).json({ message: 'Email inválido.' });
  }

  if (!emailRegex.test(userEmail)) {
     res.status(400).json({ message: 'Email inválido.' });
  }

  try {
      const userIsTutor = await Tutor.findOne({
        where: { email: userEmail }
      });

      const userIsAdestrador = await Adestrador.findOne({
        where: { email: userEmail }
      });

      const userIsPasseador = await Passeador.findOne({
        where: { email: userEmail } 
      });

      if (userIsTutor || userIsAdestrador || userIsPasseador) {
        res.status(400).json({ message: 'Email já está em uso.' });
        return;
      }
    
      next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar o email.' });
  }
    
};