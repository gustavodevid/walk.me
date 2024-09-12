import { Request, Response } from 'express';
import AdestradorService from '../services/adestrador.service';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config();
const secret = process.env.SECRET || ' ' ;
class AdestradorController {
	public async getAllAdestradors(req: Request, res: Response): Promise<void> {
		try {
			const Adestradors = await AdestradorService.getAllAdestradors();
			res.json(Adestradors);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}
	public async getAdestradorByPk(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		try {
			const Adestrador = await AdestradorService.getAdestradorByPk(id);
			res.json(Adestrador);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}

	public async createAdestrador(req: Request, res: Response): Promise<void> {
		try {
			const { nome, email, especialidade, senha } = req.body;
			const Adestrador = await AdestradorService.createAdestrador(
				nome,
				email,
				especialidade,
				senha
			);
			res.status(StatusCodes.CREATED).json(Adestrador);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}

	public async removeAdestradorByPk(
		req: Request,
		res: Response
	): Promise<void> {
		const id = req.params.id;
		try {
			const adestradorRemoved =
				await AdestradorService.removeAdestradorByPk(id);
			res.status(StatusCodes.OK).json(adestradorRemoved);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}
	public async loginAdestrador(req:Request, res:Response): Promise<void>{
		const {email, senha} = req.body;
		const user = await AdestradorService.getAdestradorByEmail(email);
		if(!user){
			res.status(StatusCodes.NOT_FOUND).json("Email não encontrado!")
		}
		else if(!await bcrypt.compare(senha, user?.senha)){
			res.status(StatusCodes.UNAUTHORIZED).json("Senha inválida!")
		}
		try{
			const token = jwt.sign({
				id: user?.id
			}, secret);
			res.status(StatusCodes.OK).json(token);

		}
		catch(err){
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Não foi possível logar!')
		}
	}
}

export default new AdestradorController();
