import Pet from '../models/pet.model';
import Passeador from '../models/passeador.model';

class PasseadorService {
  public async getAllPasseadors() {
    return Passeador.findAll();
  }
  
  public async getPasseadorByPk() {
    return Passeador.findOne();
  }

  public async createPasseador(nome: string, email: string, disponibilidade: string, senha: string) {
    return Passeador.create({ nome, email, disponibilidade, senha });
  }
}

export default new PasseadorService();
