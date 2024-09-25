import Pet from "../models/pet.model";

export interface TutorData {
    tutorId: string;
    email: string;
    nome: string;
    senha: string;
    pets: Pet[]; 
}