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

## API REST

### Endpoints Disponíveis

Tutores

- ``` /v1/tutor ``` : Retorna uma lista de tutores
- ```/v1/pet```: retorna uma lista de pets
- ```/v1/passeador```: retorna uma lista de passeadores
- ```/v1/adestrador```: retorna uma lista de adestradores