import Pet from '../models/pet.model';
import Tutor from '../models/tutor.model';
import { TutorData } from '../types/tutor.type';

class TutorService {
	public async getAllTutors(): Promise<TutorData[]> {
		return await Tutor.findAll();
	}

	public async getTutorByPk(id: string) {
		return Tutor.findOne({
			where: { tutorId: id },
			include: [{ model: Pet, as: 'pets' }],
		});
	}

	public async createTutor(nome: string, email: string, senha: string) {
		return Tutor.create({ nome, email, senha });
	}

	public async removeTutorByPk(id: string) {
		return Tutor.destroy({
			where: { tutorId: id },
			cascade: true,
		});
	}
	public async getTutorByEmail(email:string){
		return Tutor.findOne({
			where: {email:email},
		})
	}

}



export default new TutorService();
