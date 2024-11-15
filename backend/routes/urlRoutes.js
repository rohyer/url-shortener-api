import express from "express";
const router = express.Router();
import {
  registerURL,
  listURLs,
  updateURL,
  deleteURL,
  redirectToOriginalURL
} from "../controllers/urlController.js";
import protect from "../middleware/authMiddleware.js";

/**
 * @swagger
 * /api/urls:
 *   post:
 *     summary: Cadastra e encurta URL.
 *     description: Recebe uma URL no corpo da requisição, cadastra a mesma e gera sua versão encurtada. Caso o usuário seja autenticado a URL será cadastrada como pertencente ao usuário.
 *     tags: [URLs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: URL original que será encurtada
 *                 example: "https://paginadeexemplo.com.br/uma-pagina-qualquer"
 *     responses:
 *       201:
 *         description: URL encurtada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 urlShortened:
 *                   type: string
 *                   description: URL encurtada
 *                   example: "http://localhost/ivea4E"
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
 *                   example: "Por favor, preencha o campo url"
 */
router.post("/", protect, registerURL);

/**
 * @swagger
 * /api/urls:
 *   get:
 *     summary: Lista URLs encurtadas
 *     description: Caso o usuário tenha sido autenticado é listado suas URLs e a contagem de acesso de cada uma.
 *     tags: [URLs]
 *     responses:
 *       200:
 *         description: Lista de URLs encurtadas retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   click_count:
 *                     type: integer
 *                     description: Quantidade de vezes que a URL foi acessada
 *                     example: 10
 *                   url_shortener:
 *                     type: string
 *                     description: URL encurtada
 *                     example: "http://localhost/ivea4E"
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Por favor, autentique-se primeiro!"
 */
router.get("/", protect, listURLs);

/**
 * @swagger
 * /api/urls/{id}:
 *   put:
 *     summary: Atualiza a URL original
 *     description: Recebe uma URL no corpo da requisição e atualiza a URL original vinculada a um ID, caso o usuário tenha sido autenticado.
 *     tags: [URLs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único da URL que será atualizada
 *         schema:
 *           type: string
 *           example: "10"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: Nova URL original
 *                 example: "https://paginadeexemplo.com.br/uma-nova-pagina-qualquer"
 *     responses:
 *       200:
 *         description: URL atualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: URL atualizada
 *                   example: "URL atualizada"
 *                 updatedURL:
 *                   type: object
 *                   description: Informações adicionais sobre a atualização
 *                   properties:
 *                     fieldCount:
 *                       type: integer
 *                       description: Número de colunas no conjunto do resultado
 *                       example: 0
 *                     affectedRows:
 *                       type: integer
 *                       description: Linhas afetadas
 *                       example: 1
 *                     insertId:
 *                       type: integer
 *                       description: Valor do ID registrado no banco de dados
 *                       example: 1
 *                     info:
 *                       type: string
 *                       description: Informações da operação
 *                       example: "Rows matched: 1  Changed: 1  Warnings: 0"
 *                     serverStatus:
 *                       type: integer
 *                       description: Status do servidor
 *                       example: 2
 *                     warningStatus:
 *                       type: integer
 *                       description: Status de aviso
 *                       example: 0
 *                     changedRows:
 *                       type: integer
 *                       description: Linhas alteradas no banco de dados
 *                       example: 1
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
 *                   example: "URL não encontrada"
 */
router.put("/:id", protect, updateURL);

/**
 * @swagger
 * /api/urls/{id}:
 *   delete:
 *     summary: Atualiza o valor deleted_at
 *     description: Atualiza o valor deleted_at em um registro vinculado a um ID enviado como parâmetro, caso o usuário tenha sido autenticado.
 *     tags: [URLs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID único da URL que será atualiza
 *         schema:
 *           type: string
 *           example: "10"
 *     responses:
 *       200:
 *         description: URL deletada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: URL deletada
 *                   example: "URL deletada"
 *                 deletedURL:
 *                   type: object
 *                   description: Informações adicionais sobre a atualização
 *                   properties:
 *                     fieldCount:
 *                       type: integer
 *                       description: Número de colunas no conjunto do resultado
 *                       example: 0
 *                     affectedRows:
 *                       type: integer
 *                       description: Linhas afetadas
 *                       example: 1
 *                     insertId:
 *                       type: integer
 *                       description: Valor do ID registrado no banco de dados
 *                       example: 1
 *                     info:
 *                       type: string
 *                       description: Informações da operação
 *                       example: "Rows matched: 1  Changed: 1  Warnings: 0"
 *                     serverStatus:
 *                       type: integer
 *                       description: Status do servidor
 *                       example: 2
 *                     warningStatus:
 *                       type: integer
 *                       description: Status de aviso
 *                       example: 0
 *                     changedRows:
 *                       type: integer
 *                       description: Linhas alteradas no banco de dados
 *                       example: 1
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
 *                   example: "Por favor, autentique-se primeiro!"
 */
router.delete("/:id", protect, deleteURL);

/**
 * @swagger
 * /api/urls/{shortCode}:
 *   get:
 *     summary: Redireciona para a URL original
 *     description: Recebe um short code e redireciona o usuário para a URL original vinculada.
 *     tags: [URLs]
 *     parameters:
 *       - name: shortCode
 *         in: path
 *         required: true
 *         description: O código encurtado da URL
 *         schema:
 *           type: string
 *           example: "bv45ad"
 *     responses:
 *       302:
 *         description: redirecionamento feito com sucesso.
 *         headers:
 *           Location:
 *           description: Usuário redirecionado.
 *           schema:
 *             type: string
 *             format: uri
 *             example: "https://paginadeexemplo.com"
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
 *                   example: "Short code não encontrado!"
 */
router.get("/:shortCode", redirectToOriginalURL);

export default router;
