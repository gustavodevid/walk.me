import Adestrador from '../models/adestrador.model';
import Anuncio from '../models/anuncio.model';

class AdestradorService {
  public async getAllAdestradors() {
    return Adestrador.findAll();
  }
  
  public async getAdestradorByPk(id: string) {
    return Adestrador.findOne({
      where: {adestradorId: id },
      include: [{ model: Anuncio, as: 'anuncios' }]
    });
  }

  public async createAdestrador(nome: string, email: string, especialidade: string, senha: string) {
    return Adestrador.create({ nome, email, especialidade, senha });
  }
}

export default new AdestradorService();
