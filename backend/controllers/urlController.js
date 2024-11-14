import asyncHandler from "express-async-handler";
import { nanoid } from "nanoid";
import URLModel from "../models/urlModel.js";

/**
 * @description Register URL
 * @route       POST /api/urls
 * @access      Public
 */
const registerURL = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(400);
    throw new Error("Por favor, preencha o campo URL");
  }

  const shortCode = nanoid(6);

  const idUser = req.user.id || null;

  const result = await URLModel.createURL(url, shortCode, idUser);

  if (result.length > 0) {
    res.status(201).json(process.env.DOMAIN + result[0].short_code);
  } else {
    res.status(400);
    throw new Error("Erro ao criar url!");
  }
});

/**
 * @description List URLs
 * @route       GET /api/urls
 * @access      Private
 */
const listURLs = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Por favor, autentique-se primeiro!");
  }

  const result = await URLModel.getURLsByUserId(req.user.id);

  const response = handleListResponse(result);

  res.status(200);
  res.json(response);
});

/**
 * @description Update URL
 * @route       PUT /api/urls/:id
 * @access      Private
 */
const updateURL = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Por favor, autentique-se primeiro!");
  }

  const urlExists = await URLModel.getURLById(req.params.id);

  if (urlExists.length === 0) {
    res.status(400);
    throw new Error("URL não encontrada");
  }

  if (urlExists[0].id_user !== req.user.id) {
    res.status(401);
    throw new Error("Usuário não autorizado");
  }

  const updatedURL = await URLModel.updateURL(req.body.url, req.params.id);

  if (updatedURL.affectedRows === 0) {
    res.status(400);
    throw new Error("Erro ao atualizar URL!");
  }

  res.status(200);
  res.json({ message: "URL atualizada!", updatedURL });
});

/**
 * @description Soft Delete URL
 * @route       DELETE /api/urls/:id
 * @access      Private
 */
const deleteURL = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Por favor, autentique-se primeiro!");
  }

  const urlExists = await URLModel.getURLById(req.params.id);

  if (urlExists.length === 0) {
    res.status(400);
    throw new Error("URL não encontrada");
  }

  if (urlExists[0].id_user !== req.user.id) {
    res.status(401);
    throw new Error("Usuário não autorizado");
  }

  const deletedURL = await URLModel.softDeleteURL(req.params.id);

  if (deletedURL.affectedRows === 0) {
    res.status(400);
    throw new Error("Erro ao deletar URL");
  }

  res.status(200);
  res.json({ message: "URL deletada", deletedURL });
});

const redirectToOriginalURL = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const result = await URLModel.getURLByShortCode(shortCode);

  if (result.length > 0) {
    await URLModel.addClickCount(shortCode);
    res.redirect(result[0].url);
  } else {
    res.status(400);
    throw new Error("URL não encontrada");
  }
});

const handleListResponse = (data) => {
  data.forEach((element) => {
    element.url_shortener = process.env.DOMAIN + element.short_code;
    delete element.short_code;
    delete element.url;
  });

  return data;
};

export { registerURL, listURLs, updateURL, deleteURL, redirectToOriginalURL };
