# Encurtador de Links

API encurtadora de links criado com Node.js (v22.11.0), que permite transformar links longos em curtos.

## Sobre o Projeto

A API possui a principal funcionalidade de receber URLs e transformá-las em URLs curtas com um código de no máximo 6 caracteres. Também é possível atualizar, deletar, listar as URLs que pertencem a um respectivo usuário caso ele tenha sido autenticado e redirecionar o usuário para a URL original caso ele envie o short code no respectivo endpoint.
Além disso a API também possui endpoints para cadastro e login de usuário contendo uma autenticação completa e geração de Bearer Token.

### Endpoints da API
- POST: /api/users/register
- POST: /api/users/login

- POST: /api/urls
- GET: /api/urls
- PUT: /api/urls/:id
- DELETE: /api/urls/:id
- GET: /api/urls/:shortCode

## Principais Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)

## Instalação

1. Clone o repositório: git clone -b develop https://github.com/rohyer/url-shortener-api.git

2. Instale as dependências: npm install

3. Configure o Banco de dados MySQL: importe o arquivo Dump20241115.sql que está na raíz do projeto para o banco de dados MySQL. Sugestão de importação:
   1. Através do MySQL Workbench vá em Server
   2. Acesse a opção Data Import
   3. Escolha a opção "Import from Self-Contained File"
   3. Selecione o arquivo a ser importado e importe

**Observação:** Caso a importação seja feita pelo phpmyadmin desabilite a verificação de chaves estrangeiras

4. O projeto já possui um arquivo .env.example para facilitar a instalação. Ele contém as variáveis de ambiente abaixo. Antes de inicilizar o projeto renomeio para um arquivo .env

| Variáveis   | Descrição                                     | Exemplo                   |
|-------------|-----------------------------------------------|---------------------------|
| NODE_ENV    | Ambiente de desenvolvimento atual             | development ou production |
| DB_HOST     | Endereço do servidor do Banco de Dados        | localhost                 |
| DB_USER     | Usuário do Banco de Dados                     | root                      |
| DB_PASSWORD | Senha do Banco de Dados                       |                           |
| DB_NAME     | Nome do Banco de Dados                        | url_shortener             |
| PORT        | Porta em que o projeto irá rodar              | 5000                      |
| JWT_SECRET  | Código utilizado pelo módulo jsonwebtoken     | codigoqualquer            |
| DOMAIN      | Domínio utilizado para compor a URL encurtada | http://localhost/         |
 

 **Observação:** Mantenha o NODE_ENV como development ou production.

5. Rode o projeto com algum dos seguintes comandos:
   1. npm run server
   2. npm start

## Documentação

A documentação foi feita utilizando o Swagger e pode ser encontrada em **/api-docs**.

## Importante

Durante a leitura do teste vi que foi pedido para um endpoint receber a URL encurtada e redirecionar o usuário para a URL original. Para respeitar um padrão mais correto de desenvolvimento de uma API REST, ao invés de receber uma URL encurtada como parâmetro (http://localhost/abcdef) adicionei como parâmetro o recebimento do short code (abcdef) para então redirecionar o usuário a URL original.

## Futuro da API

Algumas considerações importantes a serem feitas é que, foi priorizado o desenvolvimento da API REST seguindo o padrão MVC para manter uma maior organização do código, porporcionar maior escalabilidade para o futuro e facilitar a manutenção e realização de testes.

Pensando em melhorias constante o próximo passo de evolução da API seria adicionar teste unitários como também maneiras de gerar logs e métricas, algo que pode ser feito utilizando Jest, Winston e Prometheus. Essas implementações não foram feitas no momento por questão de tempo e prioridades em relação às funcionalidades da API.