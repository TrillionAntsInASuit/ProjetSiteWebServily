import express from "express";
import usersController from "../controllers/users-controller.js";

const router = express.Router();

router.post("/login", usersController.loginUser);

router.post("/register", usersController.registerUser);

export default router;
