backend/controllers/services-controller.js [94:106]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



backend/controllers/services-controller.js [135:147]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



