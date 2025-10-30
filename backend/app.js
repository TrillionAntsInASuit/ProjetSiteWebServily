import express from "express";
import errorHandler from "./handler/error-handler.js";
import usersRoutes from "./routes/users-routes.js";
import cors from "cors";
import dotenv from "dotenv";
import { createCheckoutSession, handleStripeWebhook } from "./routes/stripe.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "projet-site-web-servily-h30x4ui6x-trillionantsinasuits-projects.vercel.app",
  "http://localhost:5173",
];
app.post('/webhook', 
  express.raw({ type: 'application/json' }), 
  handleStripeWebhook
);
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.post('/create-checkout-session', createCheckoutSession);

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
