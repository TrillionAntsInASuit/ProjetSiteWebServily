import { supabase } from "../util/supabaseClient";
import HttpError from "../util/http-error.js";

const getServices = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("services").select("*");

    if (error) {
      console.error("Supabase select error:", error);
      return next(new HttpError("Erreur de base de données.", 500));
    }

    res.json(data);
  } catch (err) {
    return next(new HttpError("Get service failed.", 500));
  }
};

const createService = async (req, res, next) => {
  try {
    const { name, nbMembres, maxMembres, description, creatorId, type } =
      req.body;

    if (
      !name ||
      !nbMembres ||
      !maxMembres ||
      !description ||
      !creatorId ||
      !type
    ) {
      return next(new HttpError("Données manquantes.", 422));
    }

    const { data: serviceExiste, error: serviceErreur } = await supabase
      .from("services")
      .select("*")
      .eq("name", name)
      .maybeSingle();

    if (serviceErreur) {
      console.error("Supabase select error:", serviceErreur);
      return next(new HttpError("Erreur de base de données.", 500));
    }

    if (serviceExiste) {
      return next(new HttpError("Un service avec ce nom existe déjà.", 422));
    }

    const { error } = await supabase
      .from("services")
      .insert([
        {
          name,
          nbMembres: 0,
          maxMembres,
          description,
          creatorId,
          type,
        },
      ])
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
  } catch (err) {
    return next(new HttpError("Creating service failed.", 500));
  }
};

const updateService = async (req, res, next) => {
  try {
    const { name, nbMembres, maxMembres, description, creatorId, type } =
      req.body;

    if (
      !name ||
      !nbMembres ||
      !maxMembres ||
      !description ||
      !creatorId ||
      !type
    ) {
      return next(new HttpError("Données manquantes.", 422));
    }

    const { data: serviceExiste, error: serviceErreur } = await supabase
      .from("services")
      .select("*")
      .eq("name", name)
      .maybeSingle();

    if (serviceErreur) {
      console.error("Supabase select error:", serviceErreur);
      return next(new HttpError("Erreur de base de données.", 500));
    }

    if (!serviceExiste) {
      return next(new HttpError("Un service avec ce nom n'existe pas.", 422));
    }

    const { error } = await supabase
      .from("services")
      .update({
        name,
        nbMembres,
        maxMembres,
        description,
        creatorId,
        type,
      })
      .eq("name", name);

    if (error) {
      console.error("Supabase update error:", error);
      return next(
        new HttpError("Mise à jour échouée, veuillez réessayer plus tard", 500)
      );
    }
  } catch (err) {
    return next(new HttpError("Updating service failed.", 500));
  }
};
const deleteService = async (req, res, next) => {
  try {
    const { name } = req.body;

    const { data: serviceExiste, error: serviceErreur } = await supabase
      .from("services")
      .select("*")
      .eq("name", name)
      .maybeSingle();

    if (serviceErreur) {
      console.error("Supabase select error:", serviceErreur);
      return next(new HttpError("Erreur de base de données.", 500));
    }

    if (!serviceExiste) {
      return next(new HttpError("Un service avec ce nom n'existe pas.", 422));
    }

    const { error } = await supabase.from("services").delete().eq("name", name);
    if (error) {
      console.error("Supabase delete error:", error);
      return next(
        new HttpError("Suppression échouée, veuillez réessayer plus tard", 500)
      );
    }
  } catch (err) {
    return next(new HttpError("Deleting service failed.", 500));
  }
};

export default {
  getServices,
  createService,
  updateService,
  deleteService,
};
