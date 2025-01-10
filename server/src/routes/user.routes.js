import { Router } from "express";
import {body} from "express-validator"
import * as userController from "../controllers/user.controller.js";
import * as userMiddleware from "../middlewares/user.middleware.js";

const router = Router();

router.post("/register", 
    body("name").isLength({min: 3, max: 50}).notEmpty().withMessage("name is required"),
    body("email").isLength({min: 5, max: 50}).isEmail().notEmpty().withMessage("email is required"),
     body("password").isLength({min: 6, max: 20}).notEmpty().withMessage("password is required"), 
    userController.createUserController
);

router.post("/login",
    body("email").isLength({min: 5, max: 50}).isEmail().notEmpty().withMessage("email is required"),
    body("password").isLength({min: 6, max: 20}).notEmpty().withMessage("password is required"), 
    userController.loginUserController
)

router.get("/profile", userMiddleware.isAuthenticated, userController.profileUserController)
router.get("/logout", userMiddleware.isAuthenticated, userController.profileUserLogout)

export default router;