import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/user", userController.findUser);

export const userRoutes = router;
