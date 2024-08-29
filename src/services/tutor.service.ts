import Pet from '../models/pet.model';
import Tutor from '../models/tutor.model';

class TutorService {
  public async getAllTutors() {
    return Tutor.findAll();
  }
  
  public async getTutorByPk(id: string) {
    return Tutor.findOne({
      where: {tutorId: id },
      include: [{ model: Pet, as: 'pets' }]});
  }

  public async createTutor(nome: string, email: string, senha: string) {
    return Tutor.create({ nome, email, senha });
  }
}

export default new TutorService();
