# Encurtador de Links

API encurtadora links criado com Node.js (v22.11.0), que permite transformar links longos em curtos.

## Sobre o Projeto

A API possui a principal funcionalidade de receber URLs e transformá-las em URLs curtas com um código de no máximo 6 caracteres. Também é possível atualizar, deletar, listar as URLs que pertencem a um respectivo usuário caso ele tenha se autenticado e redirecionar o usuário para a URL original caso ele envie o short code no respectivo endpoint.
Além disso a API também possui endpoints para cadastro e login de usuário contendo uma autenticação completa e geração de Bearer Token.
Abaixo a lista dos endpoints da API:

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

1. Clone o repositório:
git clone -b develop https://github.com/rohyer/url-shortener-api.git

2. Instale as dependências:
   npm install

3. Configure o Banco de dados MySQL:
   Importe o arquivo .sql que está na raíz do projeto para o banco de dados MySQL

4. Adicione as seguintes variáveis de ambiente em um arquivo .env na raíz do projeto antes de iniciá-lo.

Variáveis  | Descrição                                     | Exemplo

NODE_ENV   | Ambiente de desenvolvimento atual             | development ou production
PORT       | Porta em que o projeto irá rodar              | 5000
JWT_SECRET | Código utilizado pelo módulo jsonwebtoken     | codigoqualquer
DOMAIN     | Domínio utilizado para compor a URL encurtada | http://localhost/
