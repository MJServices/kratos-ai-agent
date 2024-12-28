import { Router } from "express";
import {body} from "express-validator"
import * as userController from "../controllers/user.controller.js";

const router = Router();

router.post("/register", 
    body("name").isLength({min: 3, max: 50}).notEmpty().withMessage("name is required"),
    body("email").isLength({min: 5, max: 50}).isEmail().notEmpty().withMessage("email is required"),
     body("password").isLength({min: 6, max: 20}).notEmpty().withMessage("password is required"), 
    userController.createUserController
);

export default router;