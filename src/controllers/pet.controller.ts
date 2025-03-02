import { Request, Response } from 'express';
import PetService from '../services/pet.service';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer'; 
import path from 'path';
import fs from 'fs';

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
		const id = req.params.id;
		try {
			const Pet = await PetService.getPetByPk(id);
			res.json(Pet);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	public async getPetsByTutorId(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		try {
			const Pet = await PetService.getPetsByTutorId(id);
			res.json(Pet);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	public async createPet(req: Request, res: Response): Promise<void> {
		try {
            console.log('req.body:', req.body);
            console.log('req.file:', req.file);

            const { nome, raca, idade, tutorId } = req.body;
            
            if (!req.file) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: 'A foto do pet é obrigatória.' });
                return;
            }
            const fotoPath = `${req.protocol}://${req.get('host')}/uploads/pets/${req.file.filename}`;

            const pet = await PetService.createPet(nome, raca, idade, tutorId, fotoPath);
            res.status(StatusCodes.CREATED).json(pet);
        } catch (error) {
            console.error('Erro ao criar pet:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro interno do servidor.' });
        }
	}

	private async saveBase64Image(base64String: string): Promise<string> {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
		const uint8Array = new Uint8Array(buffer);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `foto-${uniqueSuffix}.jpg`;
        const filePath = path.join('uploads/pets/', filename);

        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
		await fs.promises.writeFile(filePath, uint8Array);
        // await fs.promises.writeFile(filePath, buffer);

        return filePath.replace(/\\/g, '/');
    }

	public async removePetByPk(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		try {
			const petRemoved = await PetService.removePetByPk(id);
			res.status(StatusCodes.OK).json(petRemoved);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}
}

export default new PetController();
