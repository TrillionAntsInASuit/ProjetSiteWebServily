import { supabase } from "../util/supabaseClient";
import HttpError from "../util/http-error.js";
import { validateServicePayload, checkServiceExists } from "../util/service-utils.js";

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
    const payload = validateServicePayload(req.body);
    const existing = await checkServiceExists(payload.name);
    if (existing) throw new HttpError("Un service avec ce nom existe déjà.", 422);

    const { error } = await supabase.from("services").insert([{ ...payload, nbMembres: 0 }]).single();
    if (error) throw new HttpError("Enregistrement échoué, veuillez réessayer plus tard", 500);

    res.status(201).json({ message: "Service created successfully." });
  } catch (err) {
    next(err);
  }
};


const updateService = async (req, res, next) => {
  try {
    const payload = validateServicePayload(req.body);
    const existing = await checkServiceExists(payload.name);

    if (!existing) {
      throw new HttpError("Un service avec ce nom n'existe pas.", 422);
    }

    const { error } = await supabase
      .from("services")
      .update(payload)
      .eq("name", payload.name);

    if (error) {
      console.error("Supabase update error:", error);
      throw new HttpError("Mise à jour échouée, veuillez réessayer plus tard", 500);
    }

    res.status(200).json({ message: "Service updated successfully." });
  } catch (err) {
    next(err);
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
