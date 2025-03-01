import Servico from '../models/servico.model';
import Passeador from '../models/passeador.model';
import Pet from '../models/pet.model'; 

class ServicoService {
    public async getAllServicos() {
        return await Servico.findAll();
    }

    public async getServicoByPk(id: string) {
        return Servico.findOne({
            where: { id: id },
            include: [
                { model: Passeador, as: 'passeador' },
                { model: Pet, as: 'pet' },
            ],
        });
    }

    public async getServicosByTutorId(tutorId: string) {
        return Servico.findAll({ 
            where: { tutorId: tutorId },
            include: [
                { model: Passeador, as: 'passeador' },
                { model: Pet, as: 'pet' },
            ],
        });
    }

    public async createServico(passeadorId: number, petId: number, data: string, horario: string, tutorId: string) {
        return Servico.create({ passeadorId, petId, data, horario, tutorId });
    }

    public async removeServicoByPk(id: string) {
        return Servico.destroy({
            where: { servicoId: id },
            cascade: true,
        });
    }
}

export default new ServicoService();