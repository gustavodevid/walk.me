import { Geometry } from "geojson";
import Anuncio from "../models/anuncio.model";


class AnuncioService {
  public async getAllAnuncios() {
    return Anuncio.findAll();
  }
  
  public async getAnuncioByPk(anuncioId: string) {
    return Anuncio.findOne({where: {anuncioId: anuncioId }});
  }

  // Recebe tipo do profissional e salva na sua respectiva coluna, deixando a outra nula
  public async createAnuncio(preco: number, descricao: string, dataAnuncio: Date, 
                                localizacao:Geometry, tipoProfissional: string, 
                                idProfissional: string){
    let novoAnuncio
    if(tipoProfissional === 'adestrador'){
        novoAnuncio = {
            preco,
            descricao,
            dataAnuncio, 
            localizacao,
            adestradorId : idProfissional,
            passeadorId : null
        }
    }
    else{
        novoAnuncio = {
            preco,
            descricao,
            dataAnuncio, 
            localizacao,
            adestradorId : null,
            passeadorId : idProfissional
        }
    }
    return Anuncio.create(novoAnuncio);
  }
}

export default new AnuncioService();
