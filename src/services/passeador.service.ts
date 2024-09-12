import Passeador from '../models/passeador.model';
import Anuncio from '../models/anuncio.model';

class PasseadorService {
	public async getAllPasseadors() {
		return Passeador.findAll();
	}

	public async getPasseadorByPk(id: string) {
		return Passeador.findOne({
			where: { passeadorId: id },
			include: [{ model: Anuncio, as: 'anuncios' }],
		});
	}

	public async createPasseador(
		nome: string,
		email: string,
		disponibilidade: string,
		senha: string
	) {
		return Passeador.create({ nome, email, disponibilidade, senha });
	}

	public async removePasseadorByPk(id: string) {
		return Passeador.destroy({
			where: { passeadorId: id },
			cascade: true,
		});
	}
	public async getPasseadorByEmail(email:string){
		return Passeador.findOne({
			where: {email:email},
		})
	}
}

export default new PasseadorService();
