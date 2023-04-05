  <strong> Blogs API </strong><br />

Projeto de `backend` que consiste em desenvolver uma API e um banco de dados para a produção de conteúdo para um blog.

Foi desenvolvido utilizando _Docker, NodeJs, Express_ e Arquitetura _MSC_ e pacote do NodeJs (_Sequelize_).

  <summary><strong>Rodando o projeto localmente‼️ </strong></summary><br />
  
  1. Clone o repositório
   - `git clone git@github.com:AmandaPtela/project-blogs-api.git`
    
  2. Instale as dependências e inicialize o projeto
  - Instale as dependências:
    - `npm install`
  - Inicialize o projeto:
    - `npm start` (uma nova página deve abrir no seu navegador com o projeto)
  
  <summary><strong>Rodando o projeto no Docker‼️ </strong></summary><br />
  
  1. Clone o repositório
   - `git clone git@github.com:AmandaPtela/project-blogs-api.git`
  
  2. Acesse a raíz do projeto e inicialize/suba o container do projeto - usando o arquivo docker-compose.yml -
   - `docker-compose up -d --build`
     
  3. Acesse o bash do container
   - `docker exec -it blogs_api bash`
  4. Instale as dependências através do terminal do container:
   - `npm install`
  5. Inicialize o projeto:
   - `npm run dev`
  
*As pastas _docker-compose_ e _Docekrfile_, e o arquivo _.sequelizerc_ são de autoria da **Trybe**.*
