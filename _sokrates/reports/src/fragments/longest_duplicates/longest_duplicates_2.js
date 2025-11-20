backend/controllers/services-controller.js [20:43]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



backend/controllers/services-controller.js [79:102]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



