import express, { Request, Response } from "express";
import { userController } from "./user.controller";


const router = express.Router();

router.post("/create-admin", userController.createAdmin);
router.get("/", userController.findAdmin);

export const userRoutes = router;
