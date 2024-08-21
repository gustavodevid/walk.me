import { Request, Response } from 'express';
import PetService from '../services/pet.service';

class PetController {
  public async getAllPets(req: Request, res: Response): Promise<void> {
    try {
      const Pets = await PetService.getAllPets();
      res.json(Pets);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async getPetByPk(req: Request, res: Response): Promise<void> {
    try {
      const Pet = await PetService.getPetByPk();
      res.json(Pet);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createPet(req: Request, res: Response): Promise<void> {
    try {
      const { nome, raca, idade, tutorId } = req.body;
      const Pet = await PetService.createPet(nome, raca, idade, tutorId);
      res.status(201).json(Pet);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new PetController();
