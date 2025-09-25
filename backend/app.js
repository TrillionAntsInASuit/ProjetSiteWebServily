import express from "express";
import errorHandler from "./handler/error-handler.js";
import usersRoutes from "./routes/users-routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "projet-site-web-servily-h30x4ui6x-trillionantsinasuits-projects.vercel.app",
];
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new Error("Route non trouvée");
  error.code = 404;
  next(error);
});

app.use(errorHandler);

app.listen(5000, () => {
  console.log("serveur écoute au", `http://localhost:${PORT}`);
});
