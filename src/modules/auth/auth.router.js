import { Router } from "express";
import { sendCode, signIn, studentSignUp, userSignUp } from "./auth.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
import { validation } from "../../middleWare/validation.js";
import { signInValidation, signupValidation } from "./auth.validation.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
const router = Router();
router.post("/registerUser",auth([role.admin]),myMulter(multerValidation.pdf).single("img"),
HME, userSignUp);
router.post("/registerStudent",myMulter(multerValidation.pdf).single("img"),
HME,auth([role.admin]), studentSignUp);
router.post("/signIn",validation(signInValidation), signIn);
router.post("/sendCode", sendCode);
export default router;
