import jwt from "jsonwebtoken";
import User from "../models/user.js";
import HttpError from "../util/http-error.js";

const registerUser = async (req, res, next) => {
  const { name, password, email, status } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ name: name });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Enregistrement échoué, veuillez réessayer plus tard",
      500
    );
  }
  if (existingUser) {
    const error = new HttpError("Un utilisateur avec ce nom existe déjà.", 422);
    return next(error);
  }
  const createdUser = new User({
    name,
    password,
    email,
    status,
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Enregistrement échoué, veuillez réessayer plus tard",
      500
    );
    return next(err);
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const loginUser = async (req, res, next) => {
  const { name, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ name, password });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Échec de connexion, veuillez réessayer plus tard.",
      500
    );

    return next(err);
  }
  if (!existingUser) {
    return next(
      new HttpError("Nom d'utilisateur ou mot de passe invalide.", 401)
    );
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, name: existingUser.name },
      "cleSuperSecrete!",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Erreur lors de la génération du jeton. Réessayer plus tard.",
      500
    );
    return next(err);
  }

  res.status(200).json({
    userId: existingUser.id,
    token: token,
  });
};

export default {
  registerUser,
  loginUser,
};
