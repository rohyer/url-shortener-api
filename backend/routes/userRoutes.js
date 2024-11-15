import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
const router = express.Router();


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     description: Cria um novo usuário com base nos dados recebidos no corpo da requisição.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: "Guilherme R."
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *                 example: "guilhermerl.dev@gmail.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "123456"
 *               password2:
 *                 type: string
 *                 description: Confirmação da senha
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                   example: "Usuário cadastrado"
 *                 userId:
 *                   type: string
 *                   description: ID do usuário criado
 *                   example: "10"
 *                 token:
 *                   type: string
 *                   description: Bearer Token
 *                   example: "eyJhbGciO.eyJpZCI6M.kIOLw9N2Tn"
 *       400:
 *         description: Dados inválidos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Por favor preencha os campos"
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Autentica e realiza login do usuário
 *     description: Autentica e realiza o login do usuário com base nos dados recebidos no corpo da requisição.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *                 example: "guilhermerl.dev@gmail.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário autenticado
 *                   example: 10
 *                 name:
 *                   type: string
 *                   description: Nome usuário autenticado
 *                   example: "Guilherme R."
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário autenticado
 *                   example: "guilhermerl.dev@gmail.com"
 *                 password:
 *                   type: string
 *                   description: password hashed do usuário autenticado
 *                   example: "jbsAU3WGT.iImBHxGL"
 *                 created_at: 
 *                   type: string
 *                   description: Data e hora do cadastro do usuário
 *                   example: "2024-11-15T12:43:14.000Z"
 *                 updated_at: 
 *                   type: string
 *                   description: Data e hora da última atualização dos dados do usuário
 *                   example: "2024-11-15T12:43:14.000Z"
 *                 token: 
 *                   type: string
 *                   description: Bearer Token
 *                   example: "eyJhbGciO.eyJpZCI6M.kIOLw9N2Tn"
 *       400:
 *         description: Dados inválidos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Acessos incorretos"
 */
router.post("/login", loginUser);

export default router;
