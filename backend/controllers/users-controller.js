import jwt from "jsonwebtoken";
import { supabase } from "../util/supabaseClient.js";
import HttpError from "../util/http-error.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, password, email, status } = req.body;

    if (!name || !password || !email || !status) {
      return next(new HttpError("Données manquantes.", 422));
    }

    const { data: userExiste, error: userExisteErreur } = await supabase
      .from("users")
      .select("*")
      .eq("name", name)
      .maybeSingle();

    if (userExisteErreur) {
      console.error("Supabase select error:", userExisteErreur);
      return next(new HttpError("Erreur de base de données.", 500));
    }
    if (userExiste) {
      return next(
        new HttpError("Un utilisateur avec ce nom existe déjà.", 422)
      );
    }

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          password,
          email,
          status,
          estAbonne: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return next(
        new HttpError(
          "Enregistrement échoué, veuillez réessayer plus tard",
          500
        )
      );
    }

    res.status(201).json({ user: { ...data } });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError("Enregistrement échoué, veuillez réessayer plus tard", 500)
    );
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return next(new HttpError("Nom ou mot de passe manquant.", 422));
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("name", name)
      .single();

    if (error || !user || user.password !== password) {
      return next(
        new HttpError("Nom d'utilisateur ou mot de passe invalide.", 401)
      );
    }

    let token;
    try {
      token = jwt.sign(
        { userId: user.id, name: user.name },
        "cleSuperSecrete!",
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.error("JWT error", err);
      return next(
        new HttpError(
          "Erreur lors de la génération du jeton. Réessayer plus tard.",
          500
        )
      );
    }

    res.status(200).json({
      userId: user.id,
      token: token,
    });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError("Échec de connexion, veuillez réessayer plus tard.", 500)
    );
  }
};

export default {
  registerUser,
  loginUser,
};
