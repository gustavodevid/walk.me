import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Tutor from '../models/tutor.model';
import Pet from '../models/pet.model';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  dialect: 'postgres', 
  models: [Tutor, Pet], 
});

export default sequelize;
