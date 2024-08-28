import Pet from '../models/pet.model';
import Adestrador from '../models/adestrador.model';

class AdestradorService {
  public async getAllAdestradors() {
    return Adestrador.findAll();
  }
  
  public async getAdestradorByPk() {
    return Adestrador.findOne();
  }

  public async createAdestrador(nome: string, email: string, especialidade: string, senha: string) {
    return Adestrador.create({ nome, email, especialidade, senha });
  }
}

export default new AdestradorService();
