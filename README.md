# API Walk.me

## Detalhes técnicos

### Autenticação

| O quê       | Descrição                       |
| ------------| --------------------------------| 
| Autenticação| Não requer autenticação         |
| URL Base    | https:// .../                   |
| Versão atual| 1                               | 

### Atores
| O quê      | Descrição                       |
| -----------| --------------------------------| 
| Tutor      | Informações sobre um tutor      |
| Pet        | Informações sobre um Pet        |
| Passeador  | Informações sobre um Passeador  | 
| Adestrador | Informações sobre um Adestrador |

### Recursos

| Recurso    | URL Base                        | Versão  |
| -----------| --------------------------------| --------|
| Tutor      | {urlBase}/v1/tutor              | v1      |
| Pet        | {urlBase}/v1/pet                | v1      |
| Passeador  | {urlBase}/v1/passeador          | v1      |
| Adestrador | {urlBase}/v1/adestrador         | v1      |
| Anuncio    | {urlBase}/v1/anuncio            | v1      |
| Serviço    | {urlBase}/v1/servico            | v1      |

## API REST

### Endpoints Disponíveis

Tutores

- ``` /v1/tutor ``` : Retorna uma lista de tutores
- ``` /v1/tutor/{id} ``` : Retorna um único tutor pelo seu id

Pets 

- ``` /v1/pet```: Retorna uma lista de pets
- ``` /v1/pet/tutor/{id}```: Retorna uma lista de pets pelo id do Tutor
- ``` /v1/pet/{id} ``` : Retorna um único pet pelo seu id

Passeadores

- ``` /v1/passeador```: Retorna uma lista de passeadores
- ``` /v1/passeador/{id} ``` : Retorna um único passeador pelo seu id

Adestradores 

- ``` /v1/adestrador```: Retorna uma lista de adestradores
- ``` /v1/adestrador/{id} ``` : Retorna um único adestrador pelo seu id

Anuncios

- ``` /v1/anuncio```: Retorna uma lista de anuncios disponíveis
- ``` /v1/anuncio/{id} ``` : Retorna um único anúncio pelo seu id
- ``` /v1/anuncio/adestrador/{id} ``` : Retorna uma lista de anúncios disponíveis de um adestrador pelo seu id
- ``` /v1/anuncio/passeador/{id} ``` : Retorna uma lista de anúncios disponíveis de um passeador pelo seu id

 Serviços 

- ``` /v1/servico```: Retorna uma lista de servicos finalizados
- ``` /v1/servico/{id} ``` : Retorna um único servico finalizado
- ``` /v1/servico/pet/{id} ``` : Retorna uma lista de serviços realizados a um pet pelo seu id
- ``` /v1/servico/adestrador/{id} ``` : Retorna uma lista de serviços realizados por um adestrador pelo seu id
- ``` /v1/servico/passeador/{id} ``` : Retorna uma lista de serviços realizados por um passeador pelo seu id
- ``` /v1/servico/tutor/{id} ``` : Retorna uma lista de serviços contratados pelo tutor pelo seu id
