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
  "http://localhost:5173",
];

// CORS first for all routes EXCEPT webhook
app.use((req, res, next) => {
  if (req.path === '/webhook') {
    next();
  } else {
    cors({
      origin: allowedOrigins,
      credentials: true,
    })(req, res, next);
  }
});

// Webhook with raw body
app.post('/webhook', 
  express.raw({ type: 'application/json' }), 
  handleStripeWebhook
);

// JSON parsing for other routes
app.use(express.json());

// Routes
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