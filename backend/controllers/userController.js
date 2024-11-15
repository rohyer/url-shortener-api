import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @description Register user
 * @route       POST /api/users/register
 * @access      Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, password2 } = req.body;

  if (!name || !email || !password || !password2) {
    res.status(400);
    throw new Error("Por favor preencha os campos");
  }

  const userExists = await UserModel.getUserByEmail(email);

  if (userExists.length > 0) {
    res.status(400);
    throw new Error("E-mail já cadastrado");
  }

  if (password !== password2) {
    res.status(400);
    throw new Error("Confirme sua senha digitando-a igualmente");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  const result = await UserModel.setUser(name, email, passwordHashed);

  res.status(201);
  res.json({
    message: "Usuário criado",
    userId: result.insertId,
    token: generateToken(result.insertId)
  });
});

/**
 * @description Login user
 * @route       POST /api/users/login
 * @access      Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Por favor, preencha os campos.");
  }

  const userExists = await UserModel.getUserByEmail(email);

  if (userExists.length === 0) {
    res.status(400);
    throw new Error("Usuário não encontrado");
  }

  if (
    userExists.length > 0 &&
    (await bcrypt.compare(password, userExists[0].password))
  ) {
    userExists[0].created_at_handled = new Date(userExists[0].created_at).toLocaleString();
    userExists[0].updated_at_handled = new Date(userExists[0].updated_at).toLocaleString();

    res.status(200);
    res.json({ ...userExists[0], token: generateToken(userExists[0].id) });
  } else {
    res.status(400);
    throw new Error("Acessos incorretos");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export { registerUser, loginUser };
