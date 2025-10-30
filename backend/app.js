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
  "https://projet-site-web-servily.vercel.app",
  "https://backend-nine-flame-59.vercel.app",
  "http://localhost:5173",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

app.use(express.json());

app.post("/create-checkout-session", createCheckoutSession);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new Error("Route non trouvée");
  error.code = 404;
  next(error);
});

app.use(errorHandler);

/*app.listen(5000, () => {
  console.log("serveur écoute au", `http://localhost:${PORT}`);
});*/
export default app;
