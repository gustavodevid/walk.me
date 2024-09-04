import { Geometry } from "geojson";
import Anuncio from "../models/anuncio.model";


class AnuncioService {
  public async getAllAnuncios() {
    return Anuncio.findAll();
  }
  
  public async getAnuncioByPk(anuncioId: string) {
    return Anuncio.findOne({where: {anuncioId: anuncioId }});
  }

  public async getAnunciosAdestrador() {
    return Anuncio.findAll({where: {passeadorId:null }});
  }
  public async getAnunciosPasseador() {
    return Anuncio.findAll({where: {adestradorId:null }});
  }

  // Recebe tipo do profissional e salva na sua respectiva coluna, deixando a outra nula
  public async createAnuncio(preco: number, descricao: string, dataAnuncio: Date, 
                                localizacao:Geometry, tipoProfissional: string, 
                                idProfissional: string){
    let novoAnuncio
    if(tipoProfissional.toLowerCase() === 'adestrador'){
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
