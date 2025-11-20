import express from "express";
import servicesController from "../controllers/services-controller";

const router = express.Router();

router.post("/create", servicesController.createService);

router.put("/edit", servicesController.updateService);

router.delete("/delete", servicesController.deleteService);

export default router;
