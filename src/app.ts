import express from 'express';
import routes from './routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static('uploads'));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);


export default app;