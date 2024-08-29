import Pet from '../models/pet.model';

class PetService {
  public async getAllPets() {
    return Pet.findAll();
  }

  public async getPetByPk(id: string) {
    return Pet.findOne({where: {petId: id }});
  }

  public async createPet(nome: string, raca: string, idade: number, tutorId: string) {
    return Pet.create({ nome, raca, idade, tutorId,  });
  }
}

export default new PetService();
