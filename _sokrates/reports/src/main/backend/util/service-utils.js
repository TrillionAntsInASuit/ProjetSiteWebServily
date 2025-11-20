import { supabase } from "./supabaseClient.js";
import HttpError from "./http-error.js";

export const validateServicePayload = (body) => {
  const { name, nbMembres, maxMembres, description, creatorId, type } = body;
  if (!name || !nbMembres || !maxMembres || !description || !creatorId || !type) {
    throw new HttpError("Données manquantes.", 422);
  }
  return { name, nbMembres, maxMembres, description, creatorId, type };
};

export const checkServiceExists = async (name) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("name", name)
    .maybeSingle();

  if (error) {
    console.error("Supabase select error:", error);
    throw new HttpError("Erreur de base de données.", 500);
  }

  return data;
};