import { Request, Response, NextFunction } from 'express';
import Tutor from '../models/tutor.model';
import Adestrador from '../models/adestrador.model';
import Passeador from '../models/passeador.model';

// Expressão regular para validar emails
const emailRegex = /^(?!.*\.{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_EMAIL_LENGTH = 254;

export const checkExistsUserEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userEmail = req.body.email?.trim(); // Remove espaços em branco no início e no fim

  // Verifica se o email é fornecido e não é vazio
  if (!userEmail || typeof userEmail !== 'string' || userEmail.length === 0) {
    res.status(400).json({ message: 'Email inválido.' });
    return;
  }

  if (userEmail.length > MAX_EMAIL_LENGTH) {
    res.status(400).json({ message: 'Email inválido.' });
    return;
  }

  // Verifica se o email possui o formato válido
  if (!emailRegex.test(userEmail)) {
    res.status(400).json({ message: 'Email inválido.' });
    return;
  }

  // Verifica se o email começa ou termina com um ponto
  if (userEmail.startsWith('.') || userEmail.endsWith('.')) {
    res.status(400).json({ message: 'Email inválido.' });
    return;
  }

  // Verifica se o email contém caracteres não permitidos
  if (/[^a-zA-Z0-9._%+-@]/.test(userEmail)) {
    res.status(400).json({ message: 'Email inválido.' });
    return;
  }

  try {
    const userIsTutor = await Tutor.findOne({ where: { email: userEmail } });
    const userIsAdestrador = await Adestrador.findOne({ where: { email: userEmail } });
    const userIsPasseador = await Passeador.findOne({ where: { email: userEmail } });

    // Verifica se o email já está em uso
    if (userIsTutor || userIsAdestrador || userIsPasseador) {
      res.status(400).json({ message: 'Email já está em uso.' });
      return;
    }

    next();
  } catch (error) {
    console.error('Erro ao verificar email:', error);
    res.status(500).json({ message: 'Erro ao verificar o email.' });
  }
};
