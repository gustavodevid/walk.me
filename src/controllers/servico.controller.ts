import { Request, Response } from 'express';
import ServicoService from '../services/servico.service';
import { StatusCodes } from 'http-status-codes';
import { log } from 'console';

class ServicoController {
    public async getAllServicos(req: Request, res: Response): Promise<void> {
        try {
            const servicos = await ServicoService.getAllServicos();
            res.json(servicos);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    public async getServicoByPk(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
            const servico = await ServicoService.getServicoByPk(id);
            res.json(servico);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    public async getServicosByTutorId(req: Request, res: Response): Promise<void> {
        const tutorId = req.params.tutorId;   
        try {
            const servicos = await ServicoService.getServicosByTutorId(tutorId);
            res.json(servicos);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    public async createServico(req: Request, res: Response): Promise<void> {
        try {
            const { passeadorId, petId, dataServico, horario, tutorId } = req.body;
            const servico = await ServicoService.createServico(
                passeadorId,
                petId,
                dataServico,
                horario,
                tutorId
            );
            res.status(StatusCodes.CREATED).json(servico);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    }

    public async removeServicoByPk(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
            const servicoRemoved = await ServicoService.removeServicoByPk(id);
            res.status(StatusCodes.OK).json(servicoRemoved);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Internal Server Error',
            });
        }
    }
}

export default new ServicoController();