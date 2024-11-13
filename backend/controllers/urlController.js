import asyncHandler from "express-async-handler";
import { nanoid } from "nanoid";
import URLModel from "../models/urlModel.js";

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
    res.status(201).json(`http://localhost/${result[0].short_code}`);
  } else {
    res.status(400);
    throw new Error("Erro ao criar url!");
  }
});

const listURLs = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Por favor, autentique-se primeiro!");
  }

  const result = await URLModel.getURLsByUserId(req.user.id);
  res.status(200);
  res.json({ result });
});

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

  const deletedURL = await URLModel.deleteURL(req.params.id);

  if (deletedURL.affectedRows === 0) {
    res.status(400);
    throw new Error("Erro ao deletar URL");
  }

  res.status(200);
  res.json({ message: "URL deletada", deletedURL });
});

export { registerURL, listURLs, updateURL, deleteURL };
