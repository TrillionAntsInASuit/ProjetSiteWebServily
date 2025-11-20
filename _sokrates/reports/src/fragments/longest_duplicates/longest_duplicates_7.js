backend/controllers/services-controller.js [62:71]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return next(
        new HttpError(
          "Enregistrement échoué, veuillez réessayer plus tard",
          500
        )
      );
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



backend/controllers/users-controller.js [41:50]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return next(
        new HttpError(
          "Enregistrement échoué, veuillez réessayer plus tard",
          500
        )
      );
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



