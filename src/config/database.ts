import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Tutor from '../models/tutor.model';
import Pet from '../models/pet.model';
import Adestrador from '../models/adestrador.model';
import Passeador from '../models/passeador.model';
import Servico from '../models/servico.model';
import Avaliacao from '../models/avaliacao.model';
import Anuncio from '../models/anuncio.model';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  dialect: 'postgres', 
  models: [Tutor, Pet, Adestrador, Passeador, Servico, Avaliacao, Anuncio], 
});

export default sequelize;
