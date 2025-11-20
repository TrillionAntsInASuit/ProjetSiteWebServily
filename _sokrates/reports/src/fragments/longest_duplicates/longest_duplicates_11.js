backend/controllers/services-controller.js [35:43]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const { data: serviceExiste, error: serviceErreur } = await supabase
      .from("services")
      .select("*")
      .eq("name", name)
      .maybeSingle();

    if (serviceErreur) {
      console.error("Supabase select error:", serviceErreur);
      return next(new HttpError("Erreur de base de données.", 500));
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



backend/controllers/services-controller.js [135:143]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const { data: serviceExiste, error: serviceErreur } = await supabase
      .from("services")
      .select("*")
      .eq("name", name)
      .maybeSingle();

    if (serviceErreur) {
      console.error("Supabase select error:", serviceErreur);
      return next(new HttpError("Erreur de base de données.", 500));
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



